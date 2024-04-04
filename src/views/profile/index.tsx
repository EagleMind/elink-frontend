import React, { Fragment, useEffect, useState } from 'react';
import { ProfileServices } from '../../services/profile';

interface TabComponentProps {
  tabs: { name: string; content: React.ReactNode }[];
}
const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className=" w-full mt-8">
      <div className="flex ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${activeTab === index
              ? 'bg-blue-500 text-white'
              : ' hover:bg-white hover:text-blue-600 text-gray-700 transition ease-in'
              } px-4 py-2 mr-2 rounded-t-lg focus:outline-none text-sm`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-b-lg p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
interface Profile {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  profilePicture: string;
  social_media_links: { [key: string]: string };
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profilePicture: '',
    social_media_links: {
      facebook: '',
      instagram: '',
      tiktok: '',
      linkedin: ''
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getProfile = async () => {
    try {
      const profileData = await ProfileServices.fetchProfileInfos();
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleEditProfile = (field: keyof Profile, value: string) => {
    const [mainKey, subKey] = field.split('.');
    if (subKey) {
      setProfile(prevProfile => ({
        ...prevProfile,
        [mainKey]: {
          ...prevProfile[mainKey],
          [subKey]: value
        }
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        [field]: value
      }));
    }
    validateField(field, value);
  };

  const validateField = (field: keyof Profile, value: string) => {
    if (field === 'confirmPassword' && value !== profile.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: ''
      }));
    }
  };

  const handleUploadProfilePicture = (file: File) => {
    // Handle file upload, resize image, and update profile picture URL
  };

  const handleUpdateProfile = async () => {
    // Perform overall form validation before submitting
    const newErrors: { [key: string]: string } = {};
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await ProfileServices.updateProfile(profile);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };
  const handleUpdateSecurity = async () => {
    // Perform overall form validation before submitting
    const newErrors: { [key: string]: string } = {};
    if (profile.password !== profile.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await ProfileServices.updateProfile(profile);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };
  const tabs = [
    {
      name: "Information de profile", content: (
        <Fragment>
          <div className="space-y-4 flex justify-start space-x-44 ">
            <div className='flex flex-col w-1/3'>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Nom </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleEditProfile('firstName', e.target.value)} // Changed 'name' to 'firstName'
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Nom d'utilisateur </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleEditProfile('lastName', e.target.value)} // Changed 'username' to 'lastName'
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Email </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleEditProfile('email', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Mot de passe </label>
                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) => handleEditProfile('password', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Confirmer le mot de passe </label>
                <input
                  type="password"
                  value={profile.confirmPassword}
                  onChange={(e) => handleEditProfile('confirmPassword', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 my-3 text-sm">
                <label className="font-medium text-left">Votre logo </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUploadProfilePicture(e.target.files![0])}
                  className="mt-1"
                />
                <img src={profile.profilePicture} alt="Profile" className="mt-2 w-20 h-20 rounded-full" />
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-1/3">
              <div className="flex flex-col space-y-4 text-sm">
                <label className="font-medium text-left">Bio </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleEditProfile('bio', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <label className="font-medium text-left">Facebook </label>
                <input
                  type="text"
                  value={profile.social_media_links.facebook}
                  onChange={(e) => handleEditProfile('social_media_links.facebook', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <label className="font-medium text-left">Instagram </label>
                <input
                  type="text"
                  value={profile.social_media_links.instagram}
                  onChange={(e) => handleEditProfile('social_media_links.instagram', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <label className="font-medium text-left">Tiktok </label>
                <input
                  type="text"
                  value={profile.social_media_links.tiktok}
                  onChange={(e) => handleEditProfile('social_media_links.tiktok', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <label className="font-medium text-left">LinkedIn </label>
                <input
                  type="text"
                  value={profile.social_media_links.linkedin}
                  onChange={(e) => handleEditProfile('social_media_links.linkedin', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>
          <div className='flex justify-start'>
            <button onClick={handleUpdateProfile} className="px-4  bg-blue-500 text-white rounded h-[40px] hover:bg-blue-600  text-sm">Mettre à jour</button>

          </div>
        </Fragment>
      )
    },
    {
      name: "Securité du compte", content: (
        <div className='flex flex-col w-1/3 '>
          <div className="flex flex-col space-y-4 my-3 text-sm">
            <p className="font-medium text-left  text-sm">Mot de passe :</p>
            <input
              type="password"
              value={profile.password}
              onChange={(e) => handleEditProfile('password', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col space-y-4 my-3 text-sm">
            <label className="font-medium text-left text-sm">Confirmer le mot de passe </label>
            <input
              type="password"
              value={profile.confirmPassword}
              onChange={(e) => handleEditProfile('confirmPassword', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button onClick={handleUpdateSecurity} className="px-4  bg-blue-500 text-white rounded hover:bg-blue-600 h-[40px] w-1/4 text-sm">Mettre à jour</button>

        </div>
      )
    }
  ]
  return (
    <div className="flex flex-col ">
      <TabComponent tabs={tabs} />
      {/* Display error messages */}
      <div className="text-red-500 mt-2">
        {Object.values(errors).map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
