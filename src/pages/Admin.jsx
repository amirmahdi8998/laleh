import { useEffect, useState, useCallback } from 'react';
import { supabase, deleteBlogPost, uploadImage } from '../supabase';
import RichTextEditor from '../components/RichTextEditor';
import { useUI } from '../context';

const ADMIN_PASS = 'laleh@1404';

function fileToBase64(file) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => resolve('');
    r.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const { t } = useUI();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  if (!authed) {
    return (
      <div className="admin-login-shell">
        <div className="admin-login-card">
          <div className="admin-login-logo">L</div>
          <h2>{t.admin.loginTitle}</h2>
          <p>{t.admin.loginPassword}</p>
          <form onSubmit={e => { e.preventDefault(); if (pass === ADMIN_PASS) setAuthed(true); else setErr(t.admin.loginError); }}>
            <input type="password" placeholder="••••••••" value={pass} onChange={e => { setPass(e.target.value); setErr(''); }} autoFocus />
            {err && <div className="form-error">{err}</div>}
            <button className="gold-btn full" type="submit">{t.admin.loginButton}</button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { t } = useUI();
  const [tab, setTab] = useState('dashboard');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(t.admin.defaultAuthor);
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => { loadData(); }, []);

  const msg = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const loadData = async () => {
    setLoading(true);
    const localB = JSON.parse(localStorage.getItem('lalehBookings') || '[]');
    const localP = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
    if (supabase) {
      try {
        const { data: b } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
        const { data: p } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        const seen = new Set();
        const merged = [...(b || []), ...localB];
        setBookings(merged.filter(item => { const k = item.code || item.id; if (seen.has(k)) return false; seen.add(k); return true; }));
        const pseen = new Set();
        const pmerged = [...(p || []), ...localP];
        setPosts(pmerged.filter(item => { const k = item.id; if (pseen.has(k)) return false; pseen.add(k); return true; }));
      } catch {
        setBookings(localB);
        setPosts(localP);
      }
    } else {
      setBookings(localB);
      setPosts(localP);
    }
    setLoading(false);
  };

  const openNewPost = () => {
    setEditingPost(null);
    setTitle(''); setContent(''); setAuthor(t.admin.defaultAuthor); setTags(''); setImageUrl(''); setImageFile(null);
    setShowEditor(true);
  };

  const openEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title || '');
    setContent(post.content || '');
    setAuthor(post.author || t.admin.defaultAuthor);
    setTags((post.tags || []).join(', '));
    setImageUrl(post.image_url || '');
    setImageFile(null);
    setShowEditor(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    let img = imageUrl;
    if (imageFile) {
      const supabaseUrl = await uploadImage(imageFile);
      img = supabaseUrl || await fileToBase64(imageFile);
    }
    const postData = {
      title: title.trim(),
      content: content.trim(),
      image_url: img || '',
      author: author || t.admin.defaultAuthor,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      date: new Date().toLocaleDateString('fa-IR')
    };
    try {
      if (supabase) {
        if (editingPost) {
          await supabase.from('blog_posts').update(postData).eq('id', editingPost.id);
          msg(t.admin.postUpdated);
        } else {
          await supabase.from('blog_posts').insert([{ ...postData, created_at: new Date().toISOString() }]).select();
          msg(t.admin.postPublished);
        }
      } else {
        const ls = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
        if (editingPost) {
          const idx = ls.findIndex(p => String(p.id) === String(editingPost.id));
          if (idx !== -1) {
            ls[idx] = { ...ls[idx], ...postData };
          }
          msg(t.admin.postUpdated);
        } else {
          ls.unshift({ ...postData, id: Date.now().toString(), created_at: new Date().toISOString() });
          msg(t.admin.postPublished);
        }
        localStorage.setItem('lalehBlogPosts', JSON.stringify(ls));
      }
    } catch {}
    setShowEditor(false);
    setEditingPost(null);
    loadData();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t.admin.deleteConfirm)) return;
    try { if (supabase) await deleteBlogPost(id); } catch {}
    const ls = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
    localStorage.setItem('lalehBlogPosts', JSON.stringify(ls.filter(p => p.id !== id)));
    msg(t.admin.postDeleted);
    loadData();
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setImageFile(f);
  };

  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];
  const q = bookingSearch.trim().toLowerCase();
  const filteredBookings = q ? bookings.filter(b =>
    (b.code || '').toLowerCase().includes(q) ||
    (b.name || '').toLowerCase().includes(q) ||
    (b.phone || '').includes(q) ||
    (b.email || '').toLowerCase().includes(q)
  ) : bookings;
  const recentBookings = (q ? filteredBookings : bookings).slice(0, 5);
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.total) || 0), 0);

  const tabs = [
    { id: 'dashboard', label: t.admin.dashboard, icon: '📊' },
    { id: 'bookings', label: t.admin.reservations, icon: '📋', count: bookings.length },
    { id: 'blog', label: t.admin.posts, icon: '📝', count: posts.length },
  ];

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-topbar-brand">
            <span className="admin-logo-mark">L</span>
            <span>{t.admin.adminPanel}</span>
          </div>
          <nav className="admin-topbar-nav">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`admin-tab ${tab === t.id ? 'on' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span>{t.icon}</span>
                {t.label}
                {t.count !== undefined && <span className="admin-tab-badge">{t.count}</span>}
              </button>
            ))}
          </nav>
          <a href="/" className="admin-exit-link">← {t.admin.logout}</a>
        </div>
      </header>

      <main className="admin-body">
        {loading ? (
          <div className="aload"><div className="aspin" /></div>
        ) : tab === 'dashboard' ? (
          <div className="adash">
            <div className="adash-cards">
              <div className="adash-card">
                <span className="adash-icon">📋</span>
                <strong>{bookings.length}</strong>
                <small>{t.admin.totalBookings}</small>
              </div>
              <div className="adash-card">
                <span className="adash-icon">📝</span>
                <strong>{posts.length}</strong>
                <small>{t.admin.blogPosts}</small>
              </div>
              <div className="adash-card">
                <span className="adash-icon">💰</span>
                <strong>{totalRevenue.toLocaleString('fa-IR')}</strong>
                <small>{t.admin.totalRevenue}</small>
              </div>
              <div className="adash-card">
                <span className="adash-icon">🏷️</span>
                <strong>{allTags.length}</strong>
                <small>{t.admin.categories}</small>
              </div>
            </div>
            <div className="adash-grid">
              <div className="adash-panel">
                <h3>{t.admin.recentBookings}</h3>
                {recentBookings.length === 0 ? (
                  <div className="aempty">📭 {t.admin.noBookings}</div>
                ) : (
                  <div className="atable-wrap">
                    <table className="atable">
                      <thead><tr><th>{t.admin.guest}</th><th>{t.admin.room}</th><th>{t.admin.amount}</th><th>{t.admin.date}</th></tr></thead>
                      <tbody>
                        {recentBookings.map((b, i) => (
                          <tr key={b.code || i}>
                            <td className="aname">{b.name || '-'}</td>
                            <td>{b.roomName || b.room_name || '-'}</td>
                            <td className="aprice">{b.total ? b.total.toLocaleString('fa-IR') + ' ' + t.admin.currencyUnit : '-'}</td>
                            <td className="adate">{b.created_at ? new Date(b.created_at).toLocaleDateString('fa-IR') : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="adash-panel">
                <h3>{t.admin.popularTags}</h3>
                {allTags.length === 0 ? (
                  <div className="aempty">🏷️ {t.admin.noTags}</div>
                ) : (
                  <div className="adash-tags">
                    {allTags.map(tag => {
                      const count = posts.filter(p => (p.tags || []).includes(tag)).length;
                      return (
                        <div key={tag} className="adash-tag">
                          <span>{tag}</span>
                          <small>{count} {t.admin.postCount}</small>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : tab === 'bookings' ? (
          <div>
            <div className="admin-section-header">
              <h2>📋 {t.admin.reservations}</h2>
              <div className="admin-section-actions">
                <input className="admin-search-input" type="text" placeholder={t.admin.searchPlaceholder} value={bookingSearch} onChange={e => setBookingSearch(e.target.value)} />
                <span className="admin-count">{bookings.length} {t.admin.reservations}</span>
              </div>
            </div>
            <div className="acard">
              {bookings.length === 0 ? <div className="aempty">📭 {t.admin.noBookings}</div> : (
                <div className="atable-wrap">
                  <table className="atable">
                    <thead><tr><th>{t.admin.code}</th><th>{t.admin.guest}</th><th>{t.admin.phone}</th><th>{t.admin.email}</th><th>{t.admin.room}</th><th>{t.admin.checkin}</th><th>{t.admin.checkout}</th><th>{t.admin.nights}</th><th>{t.admin.amount}</th><th>{t.admin.regDate}</th></tr></thead>
                    <tbody>
                      {(q ? filteredBookings : bookings).length === 0 ? (
                        <tr><td colSpan={10} style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>❌ {t.admin.noSearchResults}</td></tr>
                      ) : (q ? filteredBookings : bookings).map((b, i) => (
                        <tr key={b.code || i}>
                          <td><span className="acode">{b.code || '-'}</span></td>
                          <td className="aname">{b.name || '-'}</td>
                          <td dir="ltr">{b.phone || '-'}</td>
                          <td style={{ fontSize: '.75rem' }}>{b.email || '-'}</td>
                          <td>{b.roomName || b.room_name || '-'}</td>
                          <td className="adate">{b.checkin ? new Date(b.checkin).toLocaleDateString('fa-IR') : '-'}</td>
                          <td className="adate">{b.checkout ? new Date(b.checkout).toLocaleDateString('fa-IR') : '-'}</td>
                          <td>{b.nights || '-'}</td>
                          <td className="aprice">{b.total ? b.total.toLocaleString('fa-IR') + ' ' + t.admin.currencyUnit : '-'}</td>
                          <td className="adate">{b.created_at ? new Date(b.created_at).toLocaleDateString('fa-IR') : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="admin-section-header">
              <h2>📝 {t.admin.posts}</h2>
              <button className="gold-btn small" onClick={openNewPost}>+ {t.admin.newPost}</button>
            </div>
            {posts.length === 0 && !showEditor ? (
              <div className="aempty">✏️ {t.admin.firstPost}</div>
            ) : (
              <div className="apost-grid">
                {posts.map((post) => (
                  <div key={post.id || post.title} className="apost">
                    {post.image_url && <img src={post.image_url} alt={post.title} className="apost-img" />}
                    <div className="apost-body">
                      <h3>{post.title}</h3>
                      <p>{post.content ? post.content.replace(/<[^>]*>/g, '').slice(0, 100) : ''}…</p>
                      <div className="apost-meta"><span>{post.author}</span><span>{post.date || new Date(post.created_at).toLocaleDateString('fa-IR')}</span></div>
                      {post.tags?.length > 0 && <div className="apost-tags">{post.tags.map(t => <small key={t}>{t}</small>)}</div>}
                      <div className="apost-actions">
                        <button className="aedit-btn" onClick={() => openEditPost(post)}>✏️ {t.admin.edit}</button>
                        <button className="adel" onClick={() => handleDelete(post.id)}>🗑 {t.admin.delete}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showEditor && (
          <div className="aover" onClick={() => { if (!saving) { setShowEditor(false); setEditingPost(null); } }}>
            <div className="aedit" onClick={e => e.stopPropagation()}>
              <div className="aedit-head">
                <h3>{editingPost ? t.admin.editPost : t.admin.newPostTitle}</h3>
                <button className="aclose" onClick={() => { setShowEditor(false); setEditingPost(null); }}>✕</button>
              </div>
              <form onSubmit={handleSubmit}>
                <label><span>{t.admin.titleField}</span><input type="text" placeholder={t.admin.titleField + '...'} value={title} onChange={e => setTitle(e.target.value)} /></label>
                <label><span>{t.admin.content}</span><RichTextEditor value={content} onChange={setContent} placeholder={t.admin.contentField} /></label>
                <label><span>{t.admin.imageField}</span><input type="file" accept="image/*" onChange={handleFile} />
                  {imageUrl && !imageFile && <img src={imageUrl} alt="preview" className="aprev" />}
                  <small className="ahint">{t.admin.imageHint}</small>
                  <input type="url" placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                </label>
                <div className="aedit-row">
                  <label><span>{t.admin.authorField}</span><input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>
                  <label><span>{t.admin.tagsField}</span><input type="text" placeholder={t.admin.tagsPlaceholder} value={tags} onChange={e => setTags(e.target.value)} /></label>
                </div>
                <button className="gold-btn full" type="submit" disabled={saving}>
                  {saving ? '⏳ ' + t.admin.saving : editingPost ? '✏️ ' + t.admin.saveChanges : '📌 ' + t.admin.publish}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {toast && <div className="atoast">{toast}</div>}
    </div>
  );
}
