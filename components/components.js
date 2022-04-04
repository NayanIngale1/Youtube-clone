const navbar = () => {
  return ` <div class="header_left">
        <i class="material-icons" id="menu"> menu </i>
        <a href='index.html'><img
          src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png?20170829160812"
          alt=""
        /></a>
      </div>
      <div class="header_search">
        <i class="material-icons" id="goback"> arrow_back </i>
        <form action="" id="inputform">
          <input type="text" name="" id="search" placeholder="Search" />
          <button type="submit"><i class="material-icons">search </i></button>
        </form>
      </div>
      <div class="header_icons">
        <i class="material-icons display_this" id="Seachbtn">search </i>
        <i class="material-icons"> video_call </i>
        <i class="material-icons">apps </i>
        <i class="material-icons display_this"> notifications </i>
        <i class="material-icons display_this"> account_circle </i>
      </div>`;
};

const sideBar = () => {
  return `
        <div class="sidebar_categories">
          <div class="sidebar_category">
            <i class="material-icons">home </i>
            <span>Home</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> explore </i>
            <span>Explore</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> subscriptions </i>
            <span>Subscriptions</span>
          </div>
        </div>
        <hr />
        <div class="sidebar_categories">
          <div class="sidebar_category">
            <i class="material-icons">library_add_check </i>
            <span>Library</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> history </i>
            <span>History</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> play_arrow </i>
            <span>Your Videos</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> watch_later </i>
            <span>Watch Later</span>
          </div>
          <div class="sidebar_category">
            <i class="material-icons"> thumb_up </i>
            <span>Liked Videos</span>
          </div>
        </div>
      `;
};

export { navbar, sideBar };
