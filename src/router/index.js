import { createRouter, createWebHistory } from 'vue-router'

import User from '../views/users/User.vue'
import UserForm from '../views/users/UserForm.vue'
import Role from '../views/Role.vue'
import Organization from '../views/Organization.vue'
import Contact from '../views/Contact.vue'
import ContactType from '../views/ContactType.vue'
import ContactProvider from '../views/ContactProvider.vue'
import Project from '../views/Project.vue'
import ProjectType from '../views/ProjectType.vue'
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
    path: '/organizations',
    name: 'Organization',
    component: Organization
  },
  {
    path: '/contacts',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/contact-types',
    name: 'ContactType',
    component: ContactType
  },
  {
    path: '/contact-providers',
    name: 'ContactProvider',
    component: ContactProvider
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
