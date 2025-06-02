import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      setIsDarkMode(saved ? JSON.parse(saved) : true);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Updated team members data with corrected roles
  const teamMembers = [
    {
      id: 1,
      name: "Ayush Raj",
      role: "Frontend Developer & UI/UX Designer",
      specialization: "Frontend Development",
      description: "Designed and implemented the React.js user interface with modern, responsive components and interactive data visualizations. Created the complete frontend architecture with professional animations and user experience.",
      skills: ["React.js", "JavaScript", "CSS3", "HTML5", "UI/UX Design", "Responsive Design", "Data Visualization", "Animation"],
      achievements: [
        "Built complete React.js frontend application",
        "Created interactive charts and analytics dashboard",
        "Implemented dark/light mode with professional animations",
        "Developed responsive design for all devices",
        "Designed accessible, user-friendly interfaces"
      ],
      avatar: "👨‍💻",
      gradient: "from-blue-500 to-purple-600",
      github: "https://github.com/ayushraj7854",
      portfolio: "#",
      linkedin: "#"
    },
    {
      id: 2,
      name: "Aditya Mishra",
      role: "Backend Developer & DevOps Engineer",
      specialization: "Backend Development",
      description: "Architected and developed the robust Node.js/Express.js API with comprehensive security, logging, and caching features. Built the complete server-side infrastructure and database integration.",
      skills: ["Node.js", "Express.js", "RESTful APIs", "JavaScript", "DevOps", "Security", "Database Design", "API Architecture"],
      achievements: [
        "Built scalable RESTful API architecture",
        "Implemented comprehensive security middleware",
        "Set up logging, caching, and monitoring systems",
        "Configured development and production environments",
        "Created robust backend with error handling"
      ],
      avatar: "⚙️",
      gradient: "from-purple-500 to-indigo-600",
      github: "https://github.com/adityamishra",
      portfolio: "#",
      linkedin: "#"
    },
    {
      id: 3,
      name: "Aman Pratap Shahi",
      role: "Technical Writer & Documentation Specialist",
      specialization: "Documentation & Project Management",
      description: "Created comprehensive project documentation, user guides, and technical specifications. Managed project coordination and ensured proper documentation standards throughout development.",
      skills: ["Technical Writing", "Project Management", "Documentation", "API Documentation", "User Guides", "Quality Assurance", "Content Creation"],
      achievements: [
        "Developed comprehensive project documentation",
        "Created detailed API documentation and guides",
        "Wrote user manuals and technical specifications",
        "Coordinated team collaboration and workflows",
        "Ensured documentation quality and standards"
      ],
      avatar: "📚",
      gradient: "from-orange-500 to-red-600",
      github: "https://github.com/amanpratapshahi",
      portfolio: "#",
      linkedin: "#"
    },
    {
      id: 4,
      name: "Anand Singh",
      role: "Data Collector & Research Specialist",
      specialization: "Data Collection & Analysis",
      description: "Researched and collected comprehensive cloud pricing data from AWS, Azure, and GCP. Analyzed pricing structures and developed data models for accurate cost calculations.",
      skills: ["Data Collection", "Research", "Cloud Pricing Analysis", "Data Analysis", "Pricing Models", "Market Research", "Data Validation"],
      achievements: [
        "Collected comprehensive cloud pricing data",
        "Researched AWS, Azure, and GCP pricing models",
        "Analyzed multi-dimensional pricing structures",
        "Validated data accuracy and completeness",
        "Created structured pricing datasets"
      ],
      avatar: "📊",
      gradient: "from-green-500 to-teal-600",
      github: "https://github.com/anandsingh",
      portfolio: "#",
      linkedin: "#"
    }
  ];

  const projectStats = [
    { label: "Lines of Code", value: "5,000+", icon: "💻" },
    { label: "API Endpoints", value: "12+", icon: "🔗" },
    { label: "Components", value: "25+", icon: "🧩" },
    { label: "Development Hours", value: "200+", icon: "⏰" }
  ];

  const technologies = [
    { name: "React.js", icon: "⚛️", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Express.js", icon: "🚀", category: "Backend" },
    { name: "JavaScript", icon: "💛", category: "Language" },
    { name: "CSS3", icon: "🎨", category: "Styling" },
    { name: "RESTful APIs", icon: "🔄", category: "Architecture" },
    { name: "Git", icon: "📝", category: "Version Control" },
    { name: "Responsive Design", icon: "📱", category: "UI/UX" }
  ];

  return (
    <div className={`about-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header Section */}
      <header className="about-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-animation">
              <div className="logo-ring ring-1"></div>
              <div className="logo-ring ring-2"></div>
              <div className="logo-ring ring-3"></div>
              <div className="logo-center">☁️</div>
            </div>
            <div className="title-section">
              <h1 className="main-title">About CloudCalc Pro</h1>
              <p className="subtitle">Advanced Cloud Cost Analytics & Optimization Platform</p>
            </div>
          </div>
        </div>
      </header>

      <main className="about-main">
        {/* Project Overview */}
        <section className="project-overview">
          <div className="section-content">
            <h2 className="section-title">🎯 Project Overview</h2>
            <div className="overview-grid">
              <div className="overview-text">
                <p className="overview-description">
                  CloudCalc Pro is a comprehensive, full-stack web application designed to solve the complex problem 
                  of cloud cost comparison and optimization. It provides businesses and developers with an intuitive 
                  platform to compare infrastructure costs across major cloud providers, make data-driven decisions, 
                  and optimize their cloud spending.
                </p>
                <div className="key-benefits">
                  <h3>🌟 Key Benefits</h3>
                  <ul className="benefits-list">
                    <li>💰 Save 20-40% on cloud costs through optimization</li>
                    <li>⏱️ Reduce analysis time from hours to minutes</li>
                    <li>📊 Make data-driven cloud architecture decisions</li>
                    <li>🔍 Compare AWS, Azure, and GCP side-by-side</li>
                    <li>📈 Track cost trends and optimization opportunities</li>
                  </ul>
                </div>
              </div>
              <div className="stats-grid">
                {projectStats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="technology-section">
          <div className="section-content">
            <h2 className="section-title">🛠️ Technology Stack</h2>
            <div className="tech-grid">
              {technologies.map((tech, index) => (
                <div key={index} className="tech-card">
                  <div className="tech-icon">{tech.icon}</div>
                  <div className="tech-name">{tech.name}</div>
                  <div className="tech-category">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section - UPDATED */}
        <section className="team-section">
          <div className="section-content">
            <div className="team-header">
              <h2 className="section-title">👥 Meet Our Team</h2>
              <p className="team-description">
                <strong>This project was created by a talented team of final year Computer Science students.</strong>
                <br />
                Each team member contributed their specialized skills to build this comprehensive cloud cost calculator, 
                combining expertise in frontend development, backend architecture, documentation, and data research.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="team-card">
                  <div className="card-header">
                    <div className="avatar-section">
                      <div className={`avatar bg-gradient-to-br ${member.gradient}`}>
                        <span className="avatar-emoji">{member.avatar}</span>
                      </div>
                      <div className="member-basic-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <span className="specialization-tag">{member.specialization}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="member-description">{member.description}</p>
                    
                    <div className="skills-section">
                      <h4 className="skills-title">💡 Technical Skills</h4>
                      <div className="skills-tags">
                        {member.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="achievements-section">
                      <h4 className="achievements-title">🏆 Key Contributions</h4>
                      <ul className="achievements-list">
                        {member.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="social-links">
                      <a href={member.github} className="social-link github" target="_blank" rel="noopener noreferrer">
                        <span className="link-icon">📱</span>
                        <span className="link-text">GitHub</span>
                      </a>
                      <a href={member.portfolio} className="social-link portfolio" target="_blank" rel="noopener noreferrer">
                        <span className="link-icon">🌐</span>
                        <span className="link-text">Portfolio</span>
                      </a>
                      <a href={member.linkedin} className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                        <span className="link-icon">💼</span>
                        <span className="link-text">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Project Information */}
        <section className="academic-section">
          <div className="section-content">
            <h2 className="section-title">🎓 Academic Excellence</h2>
            <div className="academic-grid">
              <div className="academic-card">
                <div className="academic-icon">🎓</div>
                <h3 className="academic-title">Final Year Project</h3>
                <p className="academic-description">
                  Developed as part of our Computer Science curriculum, this project demonstrates 
                  real-world application of full-stack development principles and modern web technologies.
                </p>
              </div>
              <div className="academic-card">
                <div className="academic-icon">👥</div>
                <h3 className="academic-title">Team Collaboration</h3>
                <p className="academic-description">
                  Successfully coordinated a 4-member team with specialized roles, showcasing 
                  professional software development practices and project management skills.
                </p>
              </div>
              <div className="academic-card">
                <div className="academic-icon">🚀</div>
                <h3 className="academic-title">Industry-Ready Solution</h3>
                <p className="academic-description">
                  Built a production-ready application that addresses real business needs in 
                  cloud cost optimization, bridging academic learning with industry requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Collaboration */}
        <section className="collaboration-section">
          <div className="section-content">
            <h2 className="section-title">🤝 Team Specializations</h2>
            <div className="collaboration-grid">
              <div className="collab-card">
                <div className="collab-icon">🎨</div>
                <h3 className="collab-title">Frontend Development</h3>
                <p className="collab-description">
                  <strong>Ayush Raj</strong> - Modern React development with professional UI/UX design, 
                  responsive layouts, and interactive data visualizations.
                </p>
              </div>
              <div className="collab-card">
                <div className="collab-icon">⚙️</div>
                <h3 className="collab-title">Backend Architecture</h3>
                <p className="collab-description">
                  <strong>Aditya Mishra</strong> - Scalable Node.js/Express.js API development with 
                  comprehensive security, logging, and monitoring systems.
                </p>
              </div>
              <div className="collab-card">
                <div className="collab-icon">📚</div>
                <h3 className="collab-title">Documentation & Management</h3>
                <p className="collab-description">
                  <strong>Aman Pratap Shahi</strong> - Comprehensive project documentation, user guides, 
                  and team coordination for seamless development workflow.
                </p>
              </div>
              <div className="collab-card">
                <div className="collab-icon">📊</div>
                <h3 className="collab-title">Data Research & Collection</h3>
                <p className="collab-description">
                  <strong>Anand Singh</strong> - Comprehensive cloud pricing research, data validation, 
                  and structured dataset creation for accurate calculations.
                </p>
              </div>
            </div>
            <div className="team-motto">
              <p className="motto-text">
                🌟 <strong>Together, we transformed academic knowledge into a practical, industry-ready cloud cost calculator.</strong> 🌟
              </p>
            </div>
          </div>
        </section>

        {/* Project Impact */}
        <section className="impact-section">
          <div className="section-content">
            <h2 className="section-title">🚀 Project Impact & Learning</h2>
            <div className="impact-grid">
              <div className="impact-card">
                <h3 className="impact-title">💼 Business Value</h3>
                <ul className="impact-list">
                  <li>Solves real-world cloud cost optimization challenges</li>
                  <li>Provides practical tool for businesses and developers</li>
                  <li>Demonstrates understanding of industry needs</li>
                  <li>Creates measurable cost-saving opportunities</li>
                </ul>
              </div>
              <div className="impact-card">
                <h3 className="impact-title">🎓 Technical Learning</h3>
                <ul className="impact-list">
                  <li>Full-stack development with modern technologies</li>
                  <li>RESTful API design and implementation</li>
                  <li>Database integration and data management</li>
                  <li>Production-ready code quality and testing</li>
                </ul>
              </div>
              <div className="impact-card">
                <h3 className="impact-title">👥 Professional Skills</h3>
                <ul className="impact-list">
                  <li>Team collaboration and project management</li>
                  <li>Version control and code review practices</li>
                  <li>Documentation and communication skills</li>
                  <li>Problem-solving and critical thinking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Optimize Your Cloud Costs?</h2>
            <p className="cta-description">
              Try CloudCalc Pro today and discover how much you can save on your cloud infrastructure!
            </p>
            <div className="cta-buttons">
              <a href="/calculator" className="cta-button primary">
                🚀 Start Calculating
              </a>
              <a href="https://github.com/YOUR_USERNAME/cloud-cost-calculator" className="cta-button secondary" target="_blank" rel="noopener noreferrer">
                📱 View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;