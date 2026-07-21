import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';
import { PageHero } from '../components/Section';
import { supabase, getBlogPosts } from '../supabase';
import { useUI } from '../context';

export default function BlogDetailPage() {
  const { t, lang } = useUI();
  const isEn = lang === 'en';
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    try {
      let allPosts;
      if (supabase) {
        const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        allPosts = data || [];
      } else {
        allPosts = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
      }
      const found = allPosts.find(p => String(p.id) === String(id));
      setPost(found || null);
      if (found) {
        setRelated(allPosts.filter(p => String(p.id) !== String(id)).slice(0, 3));
      }
    } catch {
      const allPosts = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
      const found = allPosts.find(p => String(p.id) === String(id));
      setPost(found || null);
      if (found) {
        setRelated(allPosts.filter(p => String(p.id) !== String(id)).slice(0, 3));
      }
    }
    setLoading(false);
  };

  function renderContent(html) {
    if (!html) return '';
    if (/<[a-z][\s\S]*>/i.test(html)) return html;
    return html.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  }

  if (loading) {
    return (
      <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <div className="loader" />
      </section>
    );
  }

  if (!post) {
    return (
      <>
        <PageHero eyebrow={t.blog.eyebrow} title={t.blog.notFoundTitle} text={t.blog.notFoundText} />
        <section className="section" style={{ textAlign: 'center' }}>
          <Link to="/blog" className="gold-btn">{t.blog.back}</Link>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="blog-detail-hero" style={post.image_url ? { backgroundImage: `url(${post.image_url})` } : {}}>
        <div className="blog-detail-hero-overlay" />
        <div className="container blog-detail-hero-content">
          <Link to="/blog" className="blog-detail-back">← {t.blog.back}</Link>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-detail-hero-tags">
              {post.tags.map(tag => <small key={tag}>{tag}</small>)}
            </div>
          )}
          <h1>{post.title}</h1>
          <div className="blog-detail-hero-meta">
            <span>{post.author}</span>
            <span className="dot">•</span>
            <span>{post.date || new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container blog-detail-layout">
          <article className="blog-detail-article">
            <div className="blog-detail-content-card">
              {post.image_url && (
                <div className="blog-detail-image">
                  <img src={post.image_url} alt={post.title} />
                </div>
              )}
              <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
              <div className="blog-detail-share">
                <ShareButtons title={post.title} />
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }} style={{ background: 'none', border: '1px solid rgba(0,0,0,.1)', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '.82rem' }}>🔗 {t.blog.copyLink}</button>
              </div>
            </div>
          </article>

          <aside className="blog-detail-sidebar">
            {related.length > 0 && (
              <div className="blog-sidebar-section">
                <h3>{t.blog.related}</h3>
                <div className="blog-sidebar-list">
                  {related.map(r => (
                    <Link key={r.id} to={`/blog/${r.id}`} className="blog-sidebar-item">
                      {r.image_url && (
                        <div className="blog-sidebar-item-img">
                          <img src={r.image_url} alt={r.title} />
                        </div>
                      )}
                      <div className="blog-sidebar-item-body">
                        <h4>{r.title}</h4>
                        <span>{r.date || new Date(r.created_at).toLocaleDateString('fa-IR')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="blog-sidebar-section">
              <h3>{t.blog.categories}</h3>
              <div className="blog-sidebar-tags">
                {post.tags?.map(tag => (
                  <Link key={tag} to={`/blog?tag=${tag}`} className="blog-sidebar-tag">{tag}</Link>
                ))}
              </div>
            </div>

            <div className="blog-sidebar-section blog-sidebar-cta">
              <h3>{t.blog.bookingCta}</h3>
              <p>{t.blog.bookingText}</p>
              <Link to="/booking" className="gold-btn full">{t.bookOnline}</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
