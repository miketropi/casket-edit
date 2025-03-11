import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Box, Layers, Share2 } from 'lucide-react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Casket Edit</h1>
          <p>A powerful and intuitive editing platform for your creative projects</p>
          <Link to="/design" className="cta-button">
            Start Editing
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Casket Edit?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Edit3 size={32} />
            <h3>Intuitive Editing</h3>
            <p>Simple and powerful tools for seamless editing experience</p>
          </div>
          <div className="feature-card">
            <Layers size={32} />
            <h3>Layer Management</h3>
            <p>Advanced layer controls for complex compositions</p>
          </div>
          <div className="feature-card">
            <Box size={32} />
            <h3>Asset Library</h3>
            <p>Extensive collection of assets at your fingertips</p>
          </div>
          <div className="feature-card">
            <Share2 size={32} />
            <h3>Easy Sharing</h3>
            <p>Share your work with others in just a few clicks</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
