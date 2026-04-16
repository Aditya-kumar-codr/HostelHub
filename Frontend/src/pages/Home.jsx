import React from 'react';
import { LogIn, UserPlus, Utensils, Waves, ClipboardList, Wrench, ChevronRight, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Food Menu', icon: Utensils },
        { name: 'Laundry', icon: Waves },
        { name: 'Complaints', icon: Wrench },
        { name: 'Rules', icon: ClipboardList },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-100 pb-10">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:bg-indigo-700 transition-colors shadow-sm">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-2xl font-black text-indigo-600 tracking-tight">
                            HostelHub
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                onClick={() => {
                                    alert(`Please log in first to use the ${link.name} feature!`);
                                    navigate('/login');
                                }}
                                className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                            >
                                <link.icon size={18} />
                                <span>{link.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* login */}
                    <div className="flex items-center gap-4">
                        <Link to="/admin-dashboard" className="hidden sm:block text-gray-400 text-sm font-semibold hover:text-indigo-600 transition-colors pr-3 border-r border-gray-200">
                            Admin Login
                        </Link>
                        <Link to="/login" className="hidden sm:flex items-center gap-2 text-gray-600 font-semibold hover:text-indigo-600 transition-colors px-2">
                            <span className="hidden sm:inline">Log In</span>
                        </Link>
                        <Link to="/signup" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-gray-900/20 font-semibold hover:bg-gray-800 hover:-translate-y-0.5 transition-all">
                            <UserPlus size={18} />
                            <span className="hidden sm:inline">Sign Up Free</span>
                            <span className="sm:hidden">Join</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                {/* Hero Section */}
                <div className="mt-8 md:mt-12 relative bg-indigo-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/80 to-transparent"></div>

                    <div className="relative z-10 px-8 py-16 md:py-28 md:px-16 flex flex-col md:flex-row items-center">
                        <div className="md:w-[70%] text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-indigo-600 text-white border border-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
                                <Zap size={14} className="text-yellow-400" /> The New Standard of Living
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                                Everything you need to thrive at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">PST Hostel</span>
                            </h1>
                            <p className="text-indigo-100 max-w-2xl mx-auto md:mx-0 mb-10 text-lg md:text-xl font-medium leading-relaxed">
                                Experience a seamless hostel life. Check live food menus, instantly book laundry, and log maintenance complaints directly from your phone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/signup" className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-xl shadow-xl shadow-indigo-500/30 font-bold text-lg hover:bg-indigo-400 hover:scale-105 transition-all">
                                    Get Started <ArrowRight size={20} />
                                </Link>
                                <Link to="/login" className="flex items-center justify-center gap-2 bg-white text-indigo-600 border border-gray-200 px-8 py-4 rounded-xl shadow-xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all">
                                    Login to Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-12 text-gray-500 font-medium">
                    <p className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"><Star className="text-yellow-400 fill-yellow-400" size={20} /> Trusted by 500+ Students</p>
                    <p className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm"><ShieldCheck className="text-green-500" size={20} /> 24/7 Support Available</p>
                </div>

                {/* Facilities Section */}
                <div className="mt-24">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Discover Your Facilities</h2>
                        <p className="text-gray-500 text-lg">Log in to unlock exclusive features crafted specifically for PST Hostel residents.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Rooms Facility */}
                        <div className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/066/054/848/small/a-bunk-bed-with-a-window-and-a-desk-photo.jpeg" alt="Hostel Room" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">Living Area</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Hostel Rooms</h4>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1">View your room allocation, raise repair requests immediately to the administration, and securely book guest rooms for visiting parents in real-time.</p>
                                <Link to="/login" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors w-max text-lg p-2 -ml-2 rounded-lg hover:bg-indigo-50">
                                    Explore Rooms <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Playing Area Facility */}
                        <div className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                                <img src="https://img3.khelomore.com/venues/1683/coverphoto/1040x490/Screenshot-2023-08-21-155936.jpg" alt="Sports Area" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <span className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">Recreation</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Sports Complex</h4>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1">Reserve badminton courts, verify table tennis availability, and quickly check out premium sports equipment without hassle.</p>
                                <Link to="/login" className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-800 transition-colors w-max text-lg p-2 -ml-2 rounded-lg hover:bg-green-50">
                                    Play Area <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Cafeteria Facility */}
                        <div className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                                <img src="https://egimt.org/static/images/campus-life/sitting-area.jpg" alt="Cafeteria" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <span className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">Dining</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Cafeteria</h4>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1">Never miss your favorite meal! View the live weekly menu, leave immediate feedback, and pre-order late night snacks from the canteen.</p>
                                <Link to="/login" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-800 transition-colors w-max text-lg p-2 -ml-2 rounded-lg hover:bg-orange-50">
                                    See Food Menu <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Study Area Facility */}
                        <div className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-purple-100 transition-all duration-300 hover:-translate-y-2">
                            <div className="h-64 relative overflow-hidden bg-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                                <img src="https://cns.utexas.edu/sites/default/files/uploads/images/default/b2ap3_large_wu-photos-welch2.jpeg" alt="Study Area" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <span className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm">Academic</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Study Area</h4>
                                <p className="text-gray-600 leading-relaxed mb-8 flex-1">Find absolute peace. Reserve an isolated quiet seat ahead of time during exams, and check the shared resource database.</p>
                                <Link to="/login" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800 transition-colors w-max text-lg p-2 -ml-2 rounded-lg hover:bg-purple-50">
                                    Study Here <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal Footer */}
                <div className="mt-24 border-t border-gray-200 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p className="font-medium flex items-center gap-2">
                        <ShieldCheck size={16} className="text-indigo-500" /> © 2023 PST HostelHub. All rights reserved.
                    </p>
                    <div className="flex gap-6 font-medium">
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span>
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors">Help Center</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
