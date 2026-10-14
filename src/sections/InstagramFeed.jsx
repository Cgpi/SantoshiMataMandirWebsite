import { Camera, Heart, MessageCircle, ExternalLink, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import Img1 from "../assets/Img1.png";
import Img2 from "../assets/Img2.png";
import Img3 from "../assets/Img3.png";
import Img4 from "../assets/Img4.png";
import Img5 from "../assets/Img5.png";
import Img6 from "../assets/Img6.png";


const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/santoshimatamandirkatraj';

const posts = [
  {
    id: 1,
    image: Img1,  
    dateKey: 'igPost1Date',
    captionKey: 'igPost1Caption',
    likes: '1.2K',
    comments: '48',
  },
  {
    id: 2,
    image: Img2,
    dateKey: 'igPost2Date',
    captionKey: 'igPost2Caption',
    likes: '892',
    comments: '31',
  },
  {
    id: 3,
    image: Img3,
    dateKey: 'igPost3Date',
    captionKey: 'igPost3Caption',
    likes: '2.1K',
    comments: '67',
  },
  {
    id: 4,
    image: Img4,
    dateKey: 'igPost4Date',
    captionKey: 'igPost4Caption',
    likes: '1.5K',
    comments: '52',
  },
  {
    id: 5,
    image: Img5,
    dateKey: 'igPost5Date',
    captionKey: 'igPost5Caption',
    likes: '3.4K',
    comments: '89',
  },
  {
    id: 6,
    image: Img6,
    dateKey: 'igPost6Date',
    captionKey: 'igPost6Caption',
    likes: '978',
    comments: '24',
  },
];

export default function InstagramFeed() {
  const { t } = useLanguage();

  return (
    <section className="section instagram-section" id="instagram">
      <div className="container">
        <Reveal>
          <SectionTitle title={t.igTitle} subtitle={t.igSubtitle} />
        </Reveal>

        <Reveal delay={100}>
          <div className="instagram-header">
            <div className="instagram-profile">
              <div className="instagram-profile-icon">
                <Camera size={24} />
              </div>
              <div className="instagram-profile-info">
                <span className="instagram-profile-name">{t.igHandle}</span>
                <span className="instagram-profile-desc">{t.igProfileDesc}</span>
              </div>
            </div>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary instagram-follow-btn"
            >
              <Camera size={16} /> {t.igFollowBtn}
            </a>
          </div>
        </Reveal>

        <div className="instagram-grid">
          {posts.map((post, idx) => (
            <Reveal key={post.id} delay={(idx % 3) * 100}>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-card"
              >
                <div className="instagram-card-image">
                  <img src={post.image} alt={t[post.captionKey]} loading="lazy" />
                  <div className="instagram-card-overlay">
                    <div className="instagram-card-stats">
                      <span><Heart size={16} /> {post.likes}</span>
                      <span><MessageCircle size={16} /> {post.comments}</span>
                    </div>
                    <ExternalLink size={20} className="instagram-card-link-icon" />
                  </div>
                  <div className="instagram-card-date">
                    <Calendar size={12} /> {t[post.dateKey]}
                  </div>
                </div>
                <div className="instagram-card-caption">
                  <p>{t[post.captionKey]}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="instagram-footer-cta">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <Camera size={18} /> {t.igViewAll}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
