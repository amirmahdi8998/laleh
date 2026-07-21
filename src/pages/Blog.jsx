import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, Reveal } from '../components/Section';
import { supabase, getBlogPosts } from '../supabase';
import { asset } from '../data/hotelData';
import { stripHtml } from '../utils';
import { useUI } from '../context';

export default function BlogPage() {
  const { t } = useUI();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data || []);
    } catch {
      const local = JSON.parse(localStorage.getItem('lalehBlogPosts') || '[]');
      setPosts(local);
    }
    setLoading(false);
  };

  const truncate = (text, max) => {
    if (!text) return '';
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= max) return text;
    return words.slice(0, max).join(' ') + '...';
  };

  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];
  const filtered = filter ? posts.filter(p => (p.tags || []).includes(filter)) : posts;
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHero
        eyebrow={t.blog.eyebrow}
        title={t.blog.title}
        text={t.blog.text}
        image={asset('all/all-116.jpg')}
      />

      <section className="section">
        <div className="container">
          {allTags.length > 0 && (
            <div className="blog-filters">
              <button className={`filter-chip ${filter === '' ? 'active' : ''}`} onClick={() => setFilter('')}>{t.blog.all}</button>
              {allTags.map(tag => (
                <button key={tag} className={`filter-chip ${filter === tag ? 'active' : ''}`} onClick={() => setFilter(tag)}>{tag}</button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="blog-loading">
              <div className="loader" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="blog-empty">
              <span className="blog-empty-icon">📝</span>
              <h3>{t.blog.emptyTitle}</h3>
              <p>{t.blog.emptyText}</p>
            </div>
          ) : (
            <>
              {featured && (
                <Reveal className="blog-featured-wrap">
                  <Link to={`/blog/${featured.id}`} className="blog-featured">
                    {featured.image_url && (
                      <div className="blog-featured-image">
                        <img src={featured.image_url} alt={featured.title} />
                        <div className="blog-featured-badge">{t.blog.featured}</div>
                      </div>
                    )}
                    <div className="blog-featured-body">
                      <div className="blog-card-meta">
                        <span className="blog-date">{featured.date || new Date(featured.created_at).toLocaleDateString('fa-IR')}</span>
                        <span className="blog-author">{featured.author}</span>
                      </div>
                      <h2>{featured.title}</h2>
                      <p>{truncate(stripHtml(featured.content), 50)}</p>
                      {featured.tags && featured.tags.length > 0 && (
                        <div className="blog-tags">
                          {featured.tags.map(tag => <small key={tag}>{tag}</small>)}
                        </div>
                      )}
                      <span className="blog-read-more">{t.blog.readMore} ←</span>
                    </div>
                  </Link>
                </Reveal>
              )}

              {rest.length > 0 && (
                <div className="blog-masonry">
                  {rest.map((post, i) => (
                    <Reveal key={post.id || i} delay={i * 0.03} className="blog-card-wrap">
                      <Link to={`/blog/${post.id}`} className="blog-card">
                        {post.image_url && (
                          <div className="blog-card-image">
                            <img src={post.image_url} alt={post.title} loading="lazy" />
                          </div>
                        )}
                        <div className="blog-card-body">
                          <div className="blog-card-meta">
                            <span className="blog-date">{post.date || new Date(post.created_at).toLocaleDateString('fa-IR')}</span>
                            <span className="blog-author">{post.author}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p>{truncate(stripHtml(post.content), 30)}</p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="blog-tags">
                              {post.tags.map(tag => <small key={tag}>{tag}</small>)}
                            </div>
                          )}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
