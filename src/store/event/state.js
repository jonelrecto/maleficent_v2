import Vue from 'vue'

export default {
  season: {
    eventKey: '',
    eventName: '',
    seasonStart: '',
    seasonEnd: '',
    status: 'standby',
    course: '',
    seasonNumber: '',
    numOfPayment: 3,  
    numOfWorkshops: 3,
    ticketCount: '',
    ticketPrice: '',
    discount: '',
    totalAmount: '',
    installment: '',
    colorCode: ''
  },
  stepper: 2,
  seasonColor: {
    hex: '#F5AFC8'
  },
  showRight: false,
  userAuth: null,
  userTypes: {
  	'Admin': '/admin',
  	'Secretary': '/secretary',
    'Staff': '/staff'
  },
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false }
  ],
  drawerState: false,
  // events 
  events: [],
  event: {},
  eventKey: '',
  eventModal: false,
  eventLoading: false,
  isEventEmpty: false,
  eventPageModal: false,
  eventPageLoading: false,
  eventPagePhotoModal: false,
  pages: {
    header: '',
    content: '',
    footer: ''
  },
  pagePhotos: {
    eventLogo: '',
    homeLogo: '',
    titleImage: '',
    registrationImage: ''
  },
  // event seasons
  courseModal: false,
  seasonLoading: false,
  seasonModal: false,
  activityModal: false,
  activityLoading: false,
  isNewSeasonActivities: false,
  course: [],
  courseKey: '',
  numOfPayments: '',
  numOfWorkshops: '',
  seasonStart: '',
  seasonEnd: '',
  totalAmount: '',
  colorCode: '',
  newSeason: {},
  newSeasonActivities: [],
  newBatchModal: false,
  activity: {
    originalEvent: {}
  },
  activityModal2: false,
  viewMode: 'batchMode',
  batchesNode: [],
  batchNodeActivityModal: false,
  seeAllBatch: [],
  activityAgendas: [],
  // columns in events
  columns: [
    {
      name: 'code',
      required: true,
      label: 'Event Code',
      align: 'left',
      field: 'eventCode',
      style: 'width: auto',
      sortable: true
    },
    {
      name: 'name',
      required: true,
      label: 'Event Name',
      align: 'left',
      field: 'eventName',
      style: 'width: 50px',
      sortable: true
    },
    {
      name: 'restriction',
      required: true,
      label: 'Gender Restriction',
      align: 'left',
      field: 'genderRestriction',
      style: 'width: 50px',
      sortable: true
    },
    {
      name: 'ageRange',
      required: true,
      label: 'Age Range',
      align: 'left',
      style: 'width: 50px',
      sortable: true
    },
    {
      name: 'season',
      required: true,
      label: 'Latest Seasons',
      align: 'center',
      sortable: true
    },
    {
      name: 'schedule',
      required: true,
      label: 'Schedules',
      align: 'center',
      sortable: true
    },
    // {
    //   name: 'reports',
    //   required: true,
    //   label: 'Reports',
    //   align: 'center',
    //   sortable: true
    // },
    {
      name: 'actions',
      required: true,
      label: 'Actions',
      align: 'center',
      field: 'name',
      sortable: false
    }
  ],
}
