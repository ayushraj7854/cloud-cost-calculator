import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'Multi-Cloud Support',
      description: 'Compare costs across AWS, Azure, and Google Cloud Platform in one place.',
      icon: 'CLOUD'
    },
    {
      title: 'Real-Time Pricing',
      description: 'Get up-to-date pricing information directly from cloud provider APIs.',
      icon: 'PRICE'
    },
    {
      title: 'Visual Comparisons',
      description: 'Interactive charts and graphs to visualize cost differences clearly.',
      icon: 'CHART'
    },
    {
      title: 'Cost Optimization',
      description: 'Get recommendations on how to reduce your cloud infrastructure costs.',
      icon: 'SAVE'
    },
    {
      title: 'Multiple Services',
      description: 'Compare 12+ different cloud services including compute, storage, and AI.',
      icon: 'SERVICES'
    },
    {
      title: 'Export Reports',
      description: 'Export your cost analysis reports in multiple formats for easy sharing.',
      icon: 'EXPORT'
    }
  ];

  const providers = [
    { 
      name: 'Amazon AWS', 
      description: 'Leading cloud platform with comprehensive services',
      color: '#FF9900',
      services: '200+ Services'
    },
    { 
      name: 'Microsoft Azure', 
      description: 'Enterprise-focused cloud platform with strong integration',
      color: '#0078D4',
      services: '150+ Services'
    },
    { 
      name: 'Google Cloud', 
      description: 'AI and machine learning focused cloud platform',
      color: '#4285F4',
      services: '100+ Services'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechStart Inc.',
      comment: 'This calculator helped us save over $2,000 monthly by choosing the right cloud provider for our workload.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'DevOps Engineer',
      comment: 'Finally, a tool that makes cloud cost comparison simple and accurate. Highly recommended!',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'IT Manager',
      comment: 'The detailed breakdown and recommendations are incredibly valuable for budget planning.',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Cloud Providers', value: '3' },
    { label: 'Service Types', value: '12+' },
    { label: 'Cost Calculations', value: '1M+' },
    { label: 'Money Saved', value: '$500K+' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Cloud Cost Calculator
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Compare cloud costs across AWS, Azure, and Google Cloud Platform. 
            Make informed decisions and optimize your cloud spending with our comprehensive comparison tool.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/calculator"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              Start Calculating →
            </Link>
            <Link
              to="/about"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: 'transparent',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: '2px solid #667eea',
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              Why Choose Our Calculator?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Get accurate, real-time cost comparisons to make the best decisions for your cloud infrastructure.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              Compare All Major Cloud Providers
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Get side-by-side comparisons of the top cloud platforms
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {providers.map((provider, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '40px 30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: `3px solid ${provider.color}`,
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: provider.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {provider.name.charAt(0)}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  {provider.name}
                </h3>
                <p style={{
                  color: '#4a5568',
                  marginBottom: '15px',
                  lineHeight: '1.6'
                }}>
                  {provider.description}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: provider.color,
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {provider.services}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px'
            }}>
              Trusted by Developers Worldwide
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Our platform's reach and impact
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '40px 30px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '10px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              What Our Users Say
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568'
            }}>
              Real feedback from real users
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                borderLeft: '5px solid #667eea'
              }}>
                <div style={{
                  display: 'flex',
                  marginBottom: '15px'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{
                      color: '#ffd700',
                      fontSize: '1.2rem',
                      marginRight: '2px'
                    }}>
                      ★
                    </span>
                  ))}
                </div>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#4a5568',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.comment}"
                </p>
                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '15px'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: '#2d3748',
                    marginBottom: '5px'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    color: '#667eea',
                    fontSize: '0.9rem'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#667eea',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px'
          }}>
            Ready to Optimize Your Cloud Costs?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Start comparing cloud costs today and make informed decisions for your infrastructure. 
            Save money and optimize your cloud spending with our comprehensive comparison tool.
          </p>
          <Link
            to="/calculator"
            style={{
              display: 'inline-block',
              padding: '20px 40px',
              backgroundColor: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}
          >
            Get Started Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;