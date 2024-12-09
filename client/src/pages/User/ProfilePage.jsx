import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Clock, Phone, UserCheck, Bookmark, MessageCircle } from 'lucide-react';

import { BASE_API_URL } from '../../config';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/users/me`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>लोड हुँदै...</div>; // Show loading state in Nepali
  }

  if (error) {
    return <div>त्रुटि: {error}</div>; // Show error message in Nepali
  }

  if (!user) {
    return <div>कुनै प्रयोगकर्ता डाटा उपलब्ध छैन</div>; // No user data message in Nepali
  }

  return (
    <div className="sm:px-0">
        <dl className="divide-y divide-gray-200">
          {/* Full Name */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <User className="inline-block mr-2 text-gray-500" />
              पुरा नाम
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.name}</dd>
          </div>

          {/* Email Address */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Mail className="inline-block mr-2 text-gray-500" />
              इमेल ठेगाना
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>

          {/* Phone Number */}
          {user.phone && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">
                <Phone className="inline-block mr-2 text-gray-500" />
                फोन नम्बर
              </dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
            </div>
          )}

          {/* Role */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <UserCheck className="inline-block mr-2 text-gray-500" />
              भूमिका
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.role.name}</dd>
          </div>

          {/* Verified Status */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <UserCheck className="inline-block mr-2 text-gray-500" />
              प्रमाणित
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {user.isVerified ? 'प्रमाणित' : 'प्रमाणित छैन'}
            </dd>
          </div>

          {/* Joined Date */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Calendar className="inline-block mr-2 text-gray-500" />
              सामेल भएको मिति
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(user.createdAt).toLocaleString("ne-NP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </dd>
          </div>

          {/* Last Login */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Clock className="inline-block mr-2 text-gray-500" />
              पछिल्लो लगइन
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(user.lastLogin).toLocaleString("ne-NP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </dd>
          </div>

          {/* Comments */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <MessageCircle className="inline-block mr-2 text-gray-500" />
              टिप्पणीहरु
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.comments}</dd>
          </div>

          {/* Bookmarks */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              <Bookmark className="inline-block mr-2 text-gray-500" />
              बुकमार्कहरु
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{user.bookmarks}</dd>
          </div>
        </dl>
    </div>
  );
};

export default ProfilePage;
