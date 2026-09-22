import React, { useState, useEffect } from "react";
import "./App.css";

// Assuming the user's logo will be named logo.png inside src/assets.
// If it doesn't exist, we fallback to text gracefully.
import logo from "./assets/logo.png";

const membersData = [
  { id: 1, name: "Alice Johnson", role: "President", domain: "Management", isExecutive: true, bio: "Oversees all operations and leads the society towards its goals.", image: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob Smith", role: "Tech Lead", domain: "Tech", isExecutive: true, bio: "Head of the technical department. Loves React and Node.js.", image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Charlie Brown", role: "Design Head", domain: "Design", isExecutive: true, bio: "Leads the creative design team with a passion for UI/UX.", image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Diana Prince", role: "PR Manager", domain: "PR", isExecutive: true, bio: "Manages public relations and outreach strategies.", image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Evan Wright", role: "Developer", domain: "Tech", isExecutive: false, bio: "Full stack developer focusing on modern web technologies.", image: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Fiona Gallagher", role: "UI/UX Designer", domain: "Design", isExecutive: false, bio: "Creates beautiful, intuitive, and accessible user interfaces.", image: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "George Costanza", role: "Content Creator", domain: "PR", isExecutive: false, bio: "Writes engaging content for social media and blogs.", image: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Hannah Abbott", role: "Backend Developer", domain: "Tech", isExecutive: false, bio: "Specializes in scalable database management and APIs.", image: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "Ian Somerhalder", role: "Graphic Designer", domain: "Design", isExecutive: false, bio: "Expert in Adobe Creative Suite and 3D modeling.", image: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "Jane Doe", role: "Social Media Manager", domain: "PR", isExecutive: false, bio: "Handles daily social media posts and community interactions.", image: "https://i.pravatar.cc/150?img=10" },
];

const App = () => {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredMembers = membersData.filter(
    (member) => filter === "All" || member.domain === filter
  );

  const executiveMembers = filteredMembers.filter((m) => m.isExecutive);
  const societyMembers = filteredMembers.filter((m) => !m.isExecutive);

  const MemberCard = ({ member }) => (
    <div className="member-card" onClick={() => setSelectedMember(member)}>
      <div className="card-image-wrapper">
        <img src={member.image} alt={member.name} className="member-image" />
      </div>
      <div className="card-content">
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <span className="domain-tag">{member.domain}</span>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo-container">
          <img 
            src={logo} 
            alt="SOARJMI Logo" 
            className="logo-img" 
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'block'; 
            }} 
          />
          <span className="logo-text" style={{ display: 'none' }}>SOARJMI</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-track ${theme}`}>
             <div className="toggle-thumb"></div>
          </div>
          <span className="toggle-label">{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </nav>

      <header className="hero-section">
        <h1 className="main-title">Dynamic Member Portal</h1>
        <p className="subtitle">Discover the brilliant minds driving our vision forward.</p>
        
        <div className="filter-container">
          {["All", "Tech", "Design", "PR", "Management"].map((domain) => (
            <button
              key={domain}
              className={`filter-btn ${filter === domain ? "active" : ""}`}
              onClick={() => setFilter(domain)}
            >
              {domain}
            </button>
          ))}
        </div>
      </header>

      <main className="main-content">
        {executiveMembers.length > 0 && (
          <section className="members-section">
            <h2 className="section-title">Executive Members</h2>
            <div className="members-grid">
              {executiveMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {societyMembers.length > 0 && (
          <section className="members-section">
            <h2 className="section-title">Society Members</h2>
            <div className="members-grid">
              {societyMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}
        
        {filteredMembers.length === 0 && (
          <div className="no-results">
            <p>No members found for this domain.</p>
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMember(null)}>✕</button>
            <div className="modal-header">
              <img src={selectedMember.image} alt={selectedMember.name} className="modal-image" />
              <div className="modal-info">
                <h2>{selectedMember.name}</h2>
                <p className="modal-role">{selectedMember.role}</p>
                <span className="domain-tag modal-tag">{selectedMember.domain}</span>
              </div>
            </div>
            <div className="modal-body">
              <h3>About</h3>
              <p>{selectedMember.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
