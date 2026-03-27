import React from 'react';
import { LogIn, UserPlus, Utensils, Waves, ClipboardList, Wrench } from 'lucide-react';

const Home = () => {
    const navLinks = [
        { name: 'Food Menu', icon: Utensils },
        { name: 'Laundry', icon: Waves },
        { name: 'Complaints', icon: Wrench },
        { name: 'Rules', icon: ClipboardList },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-10">

            {/* Navbar */}
            <nav className="bg-indigo-600 text-white sticky top-0 z-50 shadow-md">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-3 items-center">

                    {/* Logo */}
                    <div className="flex justify-start">
                        <span className="text-2xl font-bold tracking-tight cursor-pointer">HostelHub</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center justify-center gap-6">
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex items-center gap-2 cursor-pointer hover:text-indigo-200 transition-colors">
                                <link.icon size={18} />
                                <span className="text-sm font-medium">{link.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* login */}
                    <div className="flex items-center justify-end gap-3 sm:gap-6 text-sm font-medium">
                        {/* <a href="#" className="hover:text-indigo-200 hidden sm:block">Admin</a> */}

                        <button className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-1.5 rounded-md shadow-sm font-semibold hover:bg-indigo-400 transition-colors">
                            <LogIn size={18} />
                            <span className="hidden sm:inline">Log In</span>
                            <span className="sm:hidden">Login</span>
                        </button>
                        <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-1.5 rounded-md shadow-sm font-semibold hover:bg-gray-100 transition-colors">
                            <UserPlus size={18} />
                            <span className="hidden sm:inline">Sign Up</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main */}
            <main className="w-full max-w-7xl mx-auto px-4 mt-8 space-y-8">

                {/* Main Area Area */}
                <div className="w-full bg-white p-6 md:p-8 shadow-sm rounded-lg border border-gray-100 text-center sm:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">Pst Hostel.</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto sm:mx-0 mb-5 text-sm sm:text-base">
                        Welcome to PST Hostel ! Please log in to your account.
                        You can check the food menu, book machines for laundry, and log complaints easily here.
                    </p>
                    <button className="bg-indigo-600 text-white px-8 py-2.5 rounded-md shadow-sm font-bold hover:bg-indigo-700 transition-colors">
                        Log In Here
                    </button>
                </div>

                {/* Facilities Section */}
                <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden p-6">
                    <div className="border-b pb-4 mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Hostel Facilities</h3>
                        <p className="text-sm text-gray-500 mt-1">Log in to use these features.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Rooms Facility */}
                        <div className="flex flex-col border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 flex items-center justify-center relative overflow-hidden group bg-gray-100">
                                {/*Image */}
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/066/054/848/small/a-bunk-bed-with-a-window-and-a-desk-photo.jpeg" alt="Hostel Room" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Hostel Rooms</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-1">See your room details or ask to change your room. Check if guest rooms are open for parents.</p>
                                <button className="text-blue-600 text-sm font-bold hover:underline self-start">Log In to See Rooms</button>
                            </div>
                        </div>

                        {/* Playing Area Facility */}
                        <div className="flex flex-col border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 flex items-center justify-center relative overflow-hidden group bg-gray-100">
                                {/* Image */}
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXGBcXFxgYGB0YFxcVFxcXFxcYGhgYHiggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGy0lHR0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0rK//AABEIAJYBUQMBIgACEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECAwQGB//EAE8QAAEDAQQFCAUJBQUGBwEAAAEAAhEDBBIhMQVBUWGhBhMiUnGBkdEUMrHB8BVCU2JykrLS4RYjM4LCB2NzovEkQ4OTs9M0RKPD4uPyF//EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACcRAAICAgICAgIBBQAAAAAAAAABAhEDEhMhMVEEQTJhIhQjcYHB/9oADAMBAAIRAxEAPwDlzXvYz3HPVjJ7BvwVlOosDhBjw37Fc0EZiDv8vjUoKQUpVfjJXNqTrQxryr2vSaGEqVIu9VpcZGQnXs19iP8AJuvTpurXgBWJYKeQAwx6Tpa0kkZnNczZLW9h6Li3sMLZYrU1nOMPSDqgDpEi6D6w2unaPes5x2VGkJUeiaP0iKhIc5jSI6Mm8JGsnDHUBOvYiYXnlk02KcAMZUJLsHAiC5wMgk4kQk90LrtCaepvY1r74eBJvsIwAmZ1iNa8z5GCa7ijpWVBgMTmgNyajaqb/Vc132XA79R3hWBwXE1kX0PYrbZBI7UE5I0ZsdE7Q78bl0tN29BuRrQLDZx9SfEk+9UpzWN/5X/Rcjs0mznUqnFwzRUsCz1qKeLLK+zSOW/JhLg4XXtDmnMEAgjeDgUC0JZP3Mte9h5yvhN6nAr1A0XHeqAAB0C3JdNTpYoVoWn+4H26//AF6q7Y5JKLG1CU0V9Mesy8OtTPE034gbmueVOz1WPN1rze6pEPA3sIDh4LWcNSjaKLXscHNa4BriA4AwQ0wROR3rox5G12Y5caT6MVCveY10ObeEw4C8O2CU97epWTRc0qZa9wJY09I842S0Z3ulG4OAT1LBWHzA8bWET3tfEdxKjLla8GuGGNfkJr0/OLHRrXnObIkGA2C14gC9LXQcydWxX3SuaU5p9ndFQkrRbf7EgFWnCXI/srVfRYG7093eoXwMSY/RSZXYXXb7b0Xrs9KJiYW0E5fRlPIo+WPCcdnx8BYtLaZp2YtD2ucXAkXYiAYxJPuXHWnT9Uuc5j3tLifnEw2ZAiIwyXZjwSas8/N8yK6O9LlW96D6P5U0XMY2rfa8Boc4gXXOiCejlJxyAC2i3sL3tlha2Lpa68507WgYBuildYourHomePage With Base64 Images!" alt="Sports Area" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Sports Area</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-1">Time to play badminton or table tennis. Check if sports gear is free to use.</p>
                                <button className="text-green-600 text-sm font-bold hover:underline self-start">Log In to Book Game</button>
                            </div>
                        </div>

                        {/* Cafeteria Facility */}
                        <div className="flex flex-col border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 flex items-center justify-center relative overflow-hidden group bg-gray-100">
                                {/*Image */}
                                <img src="https://egimt.org/static/images/campus-life/sitting-area.jpg" alt="Cafeteria" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Canteen</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-1">snacks and cold drinks from the hostel canteen before you get there.</p>
                                <button className="text-orange-600 text-sm font-bold hover:underline self-start">Log In to See Foods</button>
                            </div>
                        </div>

                        {/* Study Area Facility */}
                        <div className="flex flex-col border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 flex items-center justify-center relative overflow-hidden group bg-gray-100">
                                {/*Image */}
                                <img src="https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1744736274650.webp&w=828&q=75" alt="Study Area" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Study Room</h4>
                                <p className="text-sm text-gray-600 mb-4 flex-1">Quiet seat in the study room to read in peace. See what books are there.</p>
                                <button className="text-purple-600 text-sm font-bold hover:underline self-start">Log In to Find a Seat</button>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Home;
