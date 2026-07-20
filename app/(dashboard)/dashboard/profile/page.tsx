"use client";

import { useState, useRef, useEffect } from "react";
import { User, Mail, MapPin, Briefcase, Award, TrendingUp, FileText, Camera, CheckCircle2, Settings, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Shahrier Hossain",
    role: "Senior Frontend Engineer @ CareerPilot",
    email: "shahrier@example.com",
    location: "Dhaka, Bangladesh",
    experience: "4+ Years",
    topSkill: "React / Next.js",
    summary: "Passionate and results-driven Frontend Engineer with over 4 years of experience in building scalable, responsive, and accessible web applications. Specializing in the React ecosystem (Next.js, TypeScript, Tailwind CSS), I have a strong track record of delivering high-quality UI/UX and optimizing frontend performance. Always eager to learn new technologies and contribute to open-source communities.",
    avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    cover: ""
  });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cp_profile_data");
    if (saved) {
      try {
        setProfileData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved profile data");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "cover") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData(prev => {
        const newData = { ...prev, [type]: base64String };
        localStorage.setItem("cp_profile_data", JSON.stringify(newData));
        window.dispatchEvent(new Event("cp_profile_updated"));
        return newData;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("cp_profile_data", JSON.stringify(profileData));
    window.dispatchEvent(new Event("cp_profile_updated"));
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Hidden Inputs */}
      <input type="file" ref={avatarInputRef} onChange={(e) => handleImageUpload(e, "avatar")} className="hidden" accept="image/*" />
      <input type="file" ref={coverInputRef} onChange={(e) => handleImageUpload(e, "cover")} className="hidden" accept="image/*" />

      {/* Header / Cover */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-8">
        {/* Cover Banner */}
        <div 
          className="h-48 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden bg-cover bg-center"
          style={profileData.cover ? { backgroundImage: `url(${profileData.cover})` } : {}}
        >
          {!profileData.cover && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>}
          {isEditing && (
            <button 
              onClick={() => coverInputRef.current?.click()}
              className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-xl backdrop-blur-md transition-colors flex items-center gap-2 text-sm font-medium z-10"
            >
              <Camera size={16} /> Edit Cover
            </button>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 relative z-10">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-zinc-900 bg-white dark:bg-zinc-900 relative">
                <Image 
                  src={profileData.avatar} 
                  alt="Profile" 
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button 
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-transform hover:scale-105 z-10"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div className="flex-1 pb-2">
              {isEditing ? (
                <div className="space-y-2 max-w-sm">
                  <input 
                    type="text" 
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-cp-primary/20 text-zinc-900 dark:text-white"
                  />
                  <input 
                    type="text" 
                    name="role"
                    value={profileData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 text-zinc-900 dark:text-white"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{profileData.name}</h1>
                    <div className="p-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg" title="Verified Premium Member">
                      <CheckCircle2 size={18} fill="currentColor" className="text-white dark:text-zinc-900" />
                    </div>
                  </div>
                  <p className="text-zinc-500 font-medium">{profileData.role}</p>
                </>
              )}
            </div>
            
            <div className="flex gap-3 pb-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                    <Save size={18} /> Save
                  </button>
                  <button onClick={() => {
                    const saved = localStorage.getItem("cp_profile_data");
                    if (saved) {
                      setProfileData(JSON.parse(saved));
                    }
                    setIsEditing(false);
                  }} className="p-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors flex items-center justify-center">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl transition-colors">
                    Edit Profile
                  </button>
                  <Link href="/dashboard/settings" className="p-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors flex items-center justify-center">
                    <Settings size={20} />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-400">
                <Mail size={16} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Email</span>
                {isEditing ? (
                  <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none text-sm text-zinc-900 dark:text-white" />
                ) : (
                  <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">{profileData.email}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-400">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Location</span>
                {isEditing ? (
                  <input type="text" name="location" value={profileData.location} onChange={handleChange} className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none text-sm text-zinc-900 dark:text-white" />
                ) : (
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">{profileData.location}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-400">
                <Briefcase size={16} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Experience</span>
                {isEditing ? (
                  <input type="text" name="experience" value={profileData.experience} onChange={handleChange} className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none text-sm text-zinc-900 dark:text-white" />
                ) : (
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">{profileData.experience}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-zinc-400">
                <Award size={16} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Top Skill</span>
                {isEditing ? (
                  <input type="text" name="topSkill" value={profileData.topSkill} onChange={handleChange} className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none text-sm text-zinc-900 dark:text-white" />
                ) : (
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">{profileData.topSkill}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About Me */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Professional Summary</h2>
              {!isEditing && <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-cp-primary">Edit</button>}
            </div>
            {isEditing ? (
              <textarea 
                name="summary"
                value={profileData.summary}
                onChange={handleChange}
                rows={5}
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 text-zinc-900 dark:text-white resize-none"
              />
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {profileData.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Work Experience</h2>
              <button className="text-sm font-medium text-cp-primary hover:text-blue-700">Add New</button>
            </div>
            
            <div className="space-y-8">
              {[
                { role: "Senior Frontend Engineer", company: "CareerPilot AI", period: "Jan 2023 - Present", current: true },
                { role: "Frontend Developer", company: "TechCorp Ltd.", period: "Mar 2020 - Dec 2022", current: false }
              ].map((exp, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${exp.current ? 'bg-cp-primary ring-4 ring-blue-50 dark:ring-blue-900/20' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
                    {i === 0 && <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 mt-2"></div>}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white text-base">{exp.role}</h3>
                    <p className="text-sm text-zinc-900 dark:text-white font-medium">{exp.company}</p>
                    <p className="text-xs text-zinc-500 mt-1">{exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Stats */}
          <div className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider">Career Stats</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase">Total Resumes</p>
                    <p className="font-bold text-zinc-900 dark:text-white">4</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase">Avg. ATS Score</p>
                    <p className="font-bold text-zinc-900 dark:text-white">86%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Skills */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Top Skills</h2>
              <button className="text-xs font-semibold text-cp-primary hover:text-blue-700">Edit</button>
            </div>
            
            <div className="space-y-5">
              {[
                { name: "React / Next.js", progress: 95 },
                { name: "TypeScript", progress: 85 },
                { name: "Tailwind CSS", progress: 90 },
                { name: "Node.js", progress: 70 },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                    <span className="text-zinc-500">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-cp-primary h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
