"use client";

import { useState, useEffect } from "react";
import { User, Bell, Shield, Key, Smartphone, Monitor, Trash2, Mail, ExternalLink, CheckCircle2, Settings } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  const [generalSettings, setGeneralSettings] = useState({
    fullName: "Shahrier Hossain",
    email: "shahrier@example.com"
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cp_settings_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.general) setGeneralSettings(parsed.general);
        // Do not restore passwords for security reasons
      } catch (e) {
        console.error("Failed to parse saved settings data");
      }
    }
  }, []);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecuritySettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveGeneral = () => {
    setIsSaving(true);
    setSaveMessage("");
    setTimeout(() => {
      setIsSaving(false);
      
      const currentData = JSON.parse(localStorage.getItem("cp_settings_data") || "{}");
      localStorage.setItem("cp_settings_data", JSON.stringify({ ...currentData, general: generalSettings }));
      
      setSaveMessage("Settings updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 800);
  };

  const handleSaveSecurity = () => {
    if (!securitySettings.currentPassword || !securitySettings.newPassword) return;
    setIsSaving(true);
    setSaveMessage("");
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Password updated successfully!");
      setSecuritySettings({ currentPassword: "", newPassword: "" });
      setTimeout(() => setSaveMessage(""), 3000);
    }, 800);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "general", label: "General", icon: User },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security", icon: Shield },
              { id: "appearance", label: "Appearance", icon: Monitor },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSaveMessage("");
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-white dark:bg-zinc-900 text-cp-primary shadow-sm border border-zinc-200 dark:border-zinc-800" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-transparent"
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-cp-primary" : "text-zinc-400"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Profile Information</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Update your personal information.</p>
                  </div>
                  {saveMessage && <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{saveMessage}</span>}
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={generalSettings.fullName}
                        onChange={handleGeneralChange}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={generalSettings.email}
                        onChange={handleGeneralChange}
                        disabled
                        className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSaveGeneral}
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-red-200 dark:border-red-900/30 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-6">Permanently delete your account and all associated data.</p>
                  <button className="px-6 py-2.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-sm font-semibold rounded-xl transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Change Password</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Update your password to keep your account secure.</p>
                  </div>
                  {saveMessage && <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{saveMessage}</span>}
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Current Password</label>
                    <input 
                      type="password" 
                      name="currentPassword"
                      value={securitySettings.currentPassword}
                      onChange={handleSecurityChange}
                      className="w-full max-w-md px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">New Password</label>
                    <input 
                      type="password" 
                      name="newPassword"
                      value={securitySettings.newPassword}
                      onChange={handleSecurityChange}
                      className="w-full max-w-md px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cp-primary/20 focus:border-cp-primary/50 text-zinc-900 dark:text-white transition-all"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={handleSaveSecurity}
                      disabled={isSaving || !securitySettings.currentPassword || !securitySettings.newPassword}
                      className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSaving ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/60">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Active Sessions</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your active sessions across devices.</p>
                </div>
                <div className="p-0">
                  <div className="flex items-center justify-between p-6 sm:p-8 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Monitor size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white text-sm">Windows PC • Chrome</p>
                        <p className="text-xs text-zinc-500 mt-0.5">Dhaka, Bangladesh • Active Now</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-lg dark:bg-emerald-500/20 dark:text-emerald-400">Current</span>
                  </div>
                  <div className="flex items-center justify-between p-6 sm:p-8 border-t border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white text-sm">iPhone 13 • Safari</p>
                        <p className="text-xs text-zinc-500 mt-0.5">Dhaka, Bangladesh • Last active 2h ago</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">Log out</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Placeholders for other tabs */}
          {activeTab !== "general" && activeTab !== "security" && (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 shadow-sm flex flex-col items-center justify-center text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 mb-4">
                <Settings size={32} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
              <p className="text-sm text-zinc-500">This section is currently under construction in the demo.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
