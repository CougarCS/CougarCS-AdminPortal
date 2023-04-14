import { FaHome, FaUsers, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

const mockUser = {
  contact_id: "e0765790-fb13-477f-92ed-ef658effb7d8",
  uh_id: 1234567,
  email: "bfilson0@bandcamp.com",
  first_name: "Berry",
  last_name: "Filson",
};

interface SidebarProps {
  onLogout: () => void;
}

interface NavElementProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('overview');
  return (
    <div id="sidebar" className="min-h-full w-56 bg-sidebarBG flex justify-between flex-col">
      <div className="flex items-center justify-center h-19 bg-sidebarBG px-4">
        <img src="images/CougarCS-logo.png" alt="Logo" className="h-10" />
        <div>
          <span className="text-lg font-bold text-white">CougarCS</span>
        </div>
        <div>
          <span className="text-sm font-light text-white">Admin Portal</span>
        </div>

      </div>
      <div id="sidebar-content" className="sticky top-0 items-center">
        <NavElement activePage={activePage} setActivePage={setActivePage}/>
      </div>
      <div className="flex flex-col justify-end mt-auto">        
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 text-sm uppercase mt-3 mx-3 rounded-full hover:bg-red-600">Logout</button>
      </div>
    </div>
  );
};

const NavElement: React.FC<NavElementProps> =  ({activePage, setActivePage}) => {
  return (
    <div>
      <nav className="mt-8"> 
        <ul className="space-y-1">
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'overview' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('overview')}
                >
                  <FaHome className="mr-3" /> Overview
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'dashboard' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('dashboard')}
                >
                  <FaUsers className="mr-3" /> Dashboard
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'contacts' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('contacts')}
                >
                  <FaUsers className="mr-3" /> Contacts
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'membership' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('membership')}
                >
                  <FaCalendarAlt className="mr-3" /> Membership
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'events' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('events')}
                >
                  <FaCalendarAlt className="mr-3" /> Events
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${activePage === 'settings' ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => setActivePage('settings')}>
                  <FaCog className="mr-3" /> Settings
                </button>
              </li>
            </ul>
          </nav>
      </div>
    );
  };

export default Sidebar;
