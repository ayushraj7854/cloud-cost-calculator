import React from 'react';

const About = () => {
  const features = [
    {
      title: 'Real-Time Pricing',
      description: 'Get up-to-date pricing information directly from cloud provider APIs.',
      icon: 'PRICE'
    },
    {
      title: 'Comprehensive Coverage',
      description: 'Compare compute, storage, database, and networking services across all major providers.',
      icon: 'COVERAGE'
    },
    {
      title: 'Accurate Calculations',
      description: 'Our algorithms mirror the exact pricing models used by cloud providers.',
      icon: 'CALC'
    },
    {
      title: 'Multi-Region Support',
      description: 'Compare costs across different geographic regions to optimize for location.',
      icon: 'REGIONS'
    }
  ];

  const team = [
    {
      name: 'Ayush Raj',
      role: 'DevOps Engineer & Cloud Specialist',
      description: 'Handles deployment, cloud infrastructure, and DevOps practices. Ensures scalable and reliable application performance.',
      avatar: 'AR',
      skills: ['Docker', 'AWS', 'CI/CD', 'Cloud Deployment']
    },
    {
      name: 'Aditya Mishra',
      role: 'Backend Developer & Database Architect',
      description: 'Specialized in backend development and database design. Responsible for API development and data management systems.',
      avatar: 'AM',
      skills: ['Node.js', 'PostgreSQL', 'API Design', 'Database Optimization']
    },
    {
      name: 'Anand Singh',
      role: 'Frontend Developer & UI Designer',
      description: 'Expert in frontend technologies and user interface design. Focused on creating responsive and intuitive user experiences.',
      avatar: 'AS',
      skills: ['React', 'JavaScript', 'CSS', 'Responsive Design']
    },
    {
      name: 'Aman Pratap Shahi',
      role: 'Project Lead & Full Stack Developer',
      description: 'Final year computer science student passionate about cloud technologies and cost optimization. Leading the project development and architecture.',
      avatar: 'APS',
      skills: ['React', 'Node.js', 'Cloud Architecture', 'UI/UX Design']
    }
  ];

  const stats = [
    { label: 'Cloud Providers', value: '3' },
    { label: 'Service Types', value: '12+' },
    { label: 'Regions Supported', value: '20+' },
    { label: 'Cost Calculations', value: '1000+' }
  ];

  const technologies = [
    { name: 'React', description: 'Frontend Framework', icon: 'R' },
    { name: 'Node.js', description: 'Backend Runtime', icon: 'N' },
    { name: 'PostgreSQL', description: 'Database', icon: 'P' },
    { name: 'Tailwind CSS', description: 'Styling', icon: 'T' }
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
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            About Cloud Cost Calculator
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            A comprehensive tool designed to help businesses and developers make 
            informed decisions about their cloud infrastructure costs.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '30px'
              }}>
                Our Mission
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                Cloud computing has revolutionized how we build and deploy applications, 
                but choosing the right provider and configuration can be overwhelming. 
                Our mission is to simplify this decision-making process by providing 
                transparent, accurate, and easy-to-understand cost comparisons.
              </p>
              <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                Whether you are a startup looking to optimize costs or an enterprise 
                planning a multi-cloud strategy, our calculator provides the insights 
                you need to make informed decisions.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                marginTop: '30px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ffd700',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontSize: '1.5rem'
                }}>
                  💡
                </div>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  Built by developers, for developers
                </span>
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '20px'
              }}>
                Why This Matters
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  'Cloud costs can vary by up to 300% between providers',
                  'Wrong choices can lead to significant budget overruns',
                  'Optimization can save companies thousands per month',
                  'Transparency helps in budget planning and forecasting'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    fontSize: '1.1rem',
                    color: '#4a5568'
                  }}>
                    <span style={{
                      color: '#667eea',
                      marginRight: '10px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              What Makes Us Different
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We focus on accuracy, transparency, and ease of use to provide 
              the best cloud cost comparison experience.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#4a5568',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
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
              By the Numbers
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              Our platform reach and capabilities
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
                  fontSize: '1rem',
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

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568'
            }}>
              This project was created by a talented team of final year computer science students
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {team.map((member, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {member.avatar}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '10px'
                }}>
                  {member.name}
                </h3>
                <p style={{
                  color: '#667eea',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  fontSize: '1.1rem'
                }}>
                  {member.role}
                </p>
                <p style={{
                  color: '#4a5568',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {member.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center'
                }}>
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      backgroundColor: '#667eea',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
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
              Built with Modern Technology
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '20px'
            }}>
              This application showcases modern web development practices and technologies
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            {technologies.map((tech, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '30px',
                borderRadius: '15px',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#667eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px auto',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {tech.icon}
                </div>
                <h4 style={{
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '5px',
                  fontSize: '1.1rem'
                }}>
                  {tech.name}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#4a5568'
                }}>
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
            Questions or Feedback?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            We would love to hear from you! Whether you have questions, suggestions, 
            or just want to chat about cloud computing and cost optimization.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
          }}>
            <a
              href="mailto:ayushraj785403@gmail.com"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              Send Email
            </a>
            <a
              href="https://github.com/ayushraj7854/cloud-cost-calculator"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: '2px solid white',
                transition: 'all 0.3s ease'
              }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;