<template>
  <!--div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div-->
  <div class="page-wrapper">
    <!-- MENU SIDEBAR-->
    <aside class="menu-sidebar d-none d-lg-block">
      <div class="logo">
        <a href="#">
          <img src="../src/assets/images/icon/logo.png" alt="Cool Admin" />
        </a>
      </div>
      <div class="menu-sidebar__content js-scrollbar1">
        <nav class="navbar-sidebar">
          <ul class="list-unstyled navbar__list">
            <li>
              <a href="#user_menu" data-toggle="collapse" aria-expanded="false"><i class="fas fa-user"></i>Users</a>
                <ul class="collapse list-unstyled" id="user_menu">
                  <li class="main_menu">
                    <router-link to="/users">User</router-link>
                  </li>
                  <li class="main_menu">
                    <router-link to="/roles">Role</router-link>
                  </li>
                  <li class="main_menu">
                    <router-link to="/organizations">Organization</router-link>
                  </li>
                </ul>
            </li>
            <li>
              <a href="#user_contact_menu" data-toggle="collapse" aria-expanded="false"><i class="fas fa-book"></i>User Contacts</a>
                <ul class="collapse list-unstyled" id="user_contact_menu">
                  <li class="main_menu">
                    <router-link to="/contacts">Contact</router-link>
                  </li>
                  <li class="main_menu">
                    <router-link to="/contact-types">Contact Type</router-link>
                  </li>
                  <li class="main_menu">
                    <router-link to="/contact-providers">Contact Provider</router-link>
                  </li>
                </ul>
            </li>
            <li>
              <a href="#project_menu" data-toggle="collapse" aria-expanded="false"><i class="fas fa-suitcase"></i>Manage Projects</a>
                <ul class="collapse list-unstyled" id="project_menu">
                    <li class="main_menu">
                      <router-link to="/projects">Project</router-link>
                    </li>
                    <li class="main_menu">
                      <router-link to="/project-types">Project Type</router-link>
                    </li>
                </ul>
            </li>
            <li>
              <router-link to="/meetings"><i class="fas fa-group"></i>Meetings</router-link>
            </li>
            <!--li>
              <router-link to="/settings"><i class="fas fa-cog"></i>Settings</router-link>
            </li-->
          </ul>
        </nav>
      </div>
    </aside>
    <!-- END MENU SIDEBAR-->

    <!-- PAGE CONTAINER-->
    <div class="page-container">
      <!-- MAIN CONTENT-->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">

                <router-view/>
              
              </div>
            </div>
          </div>
          <!--div class="row">
            <div class="col-md-12">
              <div class="copyright">
                <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a href="https://colorlib.com">Colorlib</a>.</p>
              </div>
            </div>
          </div-->
        </div>
      </div>
      <!-- END MAIN CONTENT-->
      <!-- END PAGE CONTAINER-->
    </div>
  </div>
  <div class="">
    <!-- Sidebar -->
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        </div>

        <ul class="list-unstyled components">
            <li class="active">
                
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>

</div>

</template>

<style lang="scss">
#appp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main_menu {
  margin-left: 35px;
}

.main-content {
  padding-top: 30px !important;
}

.section__content {
  position: static !important;
}

#navv {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
