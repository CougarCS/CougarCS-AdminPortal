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
    <div className="flex-shrink-0 items-center h-screen w-56 m-0 bg-[#131313]">
      <NavElement />
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
