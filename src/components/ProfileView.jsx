import React from "react";
import {
  Mail,
  MapPin,
  BookOpen,
  Calendar,
  Star,
  Linkedin,
  Phone,
} from "lucide-react"; // icons

const ProfileView = ({ profile }) => {
  return (
    <div className="w-[90vw] mx-2 md:max-w-7xl my-2 md:my-4 md:mx-auto bg-white shadow-lg rounded-2xl md:p-6 p-4">
      {/* Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center lg:text-left">
          <img
            src={profile?.profilePic}
            alt={profile?.name}
            className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover shadow-md"
          />
          <h2 className="text-xl sm:text-2xl font-bold mt-4">{profile?.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{profile?.role}</p>
        </div>

        {/* Profile Details + Social */}
        <div className="flex-1 w-full mt-6 lg:mt-0">
          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-indigo-600" />
              <span className="font-semibold">Email:</span> {profile?.email}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" />
              <span className="font-semibold">Qualification:</span>{" "}
              {profile?.qualification}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-indigo-600" />
              <span className="font-semibold">Date of Joining:</span>{" "}
              {profile?.dateOfJoining}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" />
              <span className="font-semibold">Experience:</span>{" "}
              {profile?.experience}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-indigo-600" />
              <span className="font-semibold">Place:</span> {profile?.place}
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500" />
              <span className="font-semibold">Student Rating:</span>{" "}
              {profile?.rating}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex  flex-col sm:flex-row sm:flex-wrap gap-4">
            <a
              href={profile?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href={profile?.emailLink}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition w-full sm:w-auto"
            >
              <Mail size={18} /> Email
            </a>
            <a
              href={profile?.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition w-full sm:w-auto"
            >
              <Phone size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
