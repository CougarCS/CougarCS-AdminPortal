const mockUser = {
  contact_id: "e0765790-fb13-477f-92ed-ef658effb7d8",
  uh_id: 1234567,
  email: "bfilson0@bandcamp.com",
  first_name: "Berry",
  last_name: "Filson",
};

const Sidebar = () =>
{
  return (
    <div id="sidebar" className="min-h-full w-56 bg-sidebarBG">
      <div id="sidebar-content" className="sticky top-0 items-center">
        <NavElement />
      </div>
    </div>
  );
};

const NavElement = () =>
{
  return (
    <div>
      Nav Element A
    </div>
  );
};

export default Sidebar;
