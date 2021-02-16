import { createRouter, createWebHistory } from 'vue-router'

import User from '../views/users/User.vue'
import UserForm from '../views/users/UserForm.vue'
import Role from '../views/role/Role.vue'
import RoleForm from '../views/role/Form.vue'
import Organization from '../views/organization/Organization.vue'
import OrganizationForm from '../views/organization/Form.vue'
import Contact from '../views/user_contact/Contact.vue'
import FormContact from '../views/user_contact/Form.vue'
import ContactType from '../views/contact_type/ContactType.vue'
import FormContactType from '../views/contact_type/Form.vue'
import ContactProvider from '../views/contact_provider/ContactProvider.vue'
import FormContactProvider from '../views/contact_provider/Form.vue'
import Project from '../views/Project.vue'
import ProjectType from '../views/project_type/ProjectType.vue'
import FormProjectType from '../views/project_type/Form.vue'
import Meeting from '../views/Meeting.vue'
import MeetingType from '../views/MeetingType.vue'
import MeetingAction from '../views/MeetingAction.vue'
import MeetingActionType from '../views/MeetingActionType.vue'
import MeetingParticipant from '../views/MeetingParticipant.vue'

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" *//* '../views/About.vue')
  },*/
  {
    path: '/users',
    name: 'User',
    component: User
  },
  {
    path: '/users/create',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/users/:id/edit',
    name: 'UserFormEdit',
    component: UserForm
  },
  {
    path: '/roles',
    name: 'Role',
    component: Role
  },
  {
    path: '/roles/create',
    name: 'RoleForm',
    component: RoleForm
  },
  {
    path: '/roles/:id/edit',
    name: 'RoleFormEdit',
    component: RoleForm
  },
  {
    path: '/organizations',
    name: 'Organization',
    component: Organization
  },
  {
    path: '/organizations/create',
    name: 'CreateOrganization',
    component: OrganizationForm
  },
  {
    path: '/organizations/:id/edit',
    name: 'EditOrganization',
    component: OrganizationForm
  },
  {
    path: '/contacts',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/contacts/create',
    name: 'FormContact',
    component: FormContact
  },
  {
    path: '/contacts/:id/edit',
    name: 'EditContact',
    component: FormContact
  },
  {
    path: '/contact-types',
    name: 'ContactType',
    component: ContactType
  },
  {
    path: '/contact-types/create',
    name: 'FormContactType',
    component: FormContactType
  },
  {
    path: '/contact-types/:id/edit',
    name: 'EditContactType',
    component: FormContactType
  },
  {
    path: '/contact-providers',
    name: 'ContactProvider',
    component: ContactProvider
  },
  {
    path: '/contact-providers/create',
    name: 'FormContactProvider',
    component: FormContactProvider
  },
  {
    path: '/contact-providers/:id/edit',
    name: 'EditCotnactProvider',
    component: FormContactProvider
  },
  {
    path: '/projects',
    name: 'Project',
    component: Project
  },
  {
    path: '/project-types',
    name: 'ProjectType',
    component: ProjectType
  },
  {
    path: '/project-types/create',
    name: 'CreateProjectType',
    component: FormProjectType
  },
  {
    path: '/project-type/:id/edit',
    name: 'EditProjectType',
    component: FormProjectType
  },
  {
    path: '/meetings',
    name: 'Meeting',
    component: Meeting
  },
  {
    path: '/meeting-types',
    name: 'MeetingType',
    component: MeetingType
  },
  {
    path: '/meeting-actions',
    name: 'MeetingAction',
    component: MeetingAction
  },
  {
    path: '/meeting-action-types',
    name: 'MeetingActionType',
    component: MeetingActionType
  },
  {
    path: '/meeting-participants',
    name: 'MeetingParticipant',
    component: MeetingParticipant
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
