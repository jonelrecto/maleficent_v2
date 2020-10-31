<template>
  <div>
    <v-container class="pt-0" grid-list-xl fill-height>
      <!-- <v-form v-model="isValid"> -->
      <v-layout wrap justify-space-between>
        
          <v-flex xs12 md6>
          <v-form ref="form" v-model="isValid">

<!--           
            <v-btn @click="test">
              test 
            </v-btn> -->
            <v-select
              v-model="season.course"
              :items="courses"
              item-text="courseName"
              return-object
              single-line
              label="Course *"
              hide-no-data 
              :hint="`Activities: ${getActivities}`"
              no-data-text="Empty Course"
              persistent-hint
              required
            >
              <template slot="prepend-item">                
                <v-btn flat block @click="addNewCourse()">
                  <v-icon>mdi-plus</v-icon>
                  New Course
                </v-btn>
              </template>
            </v-select>
            <div>
              <!-- <span>Activities: </span> -->
            </div>
            
            <v-text-field
              v-model="season.seasonNumber"
              label="Season Number *"
              type="number"
              required
            ></v-text-field>


            <v-text-field
              v-model="season.numOfPayment"
              label="Number of Payment *"
              type="number"
              required
            ></v-text-field>

            <v-text-field
              v-model="season.numOfWorkshops"
              label="Number of Workshops *"
              type="number"
              required
            ></v-text-field>
          </v-form>
            
        </v-flex>
          
        <v-flex xs12 md6>
          <v-form v-model="isValid">

         

            <v-text-field
              v-model="season.ticketCount"
              label="Ticket Count *"
              type="number"
              required
            ></v-text-field>

            <v-text-field
              v-model="season.ticketPrice"
              label="Ticket Price *"
              type="number"
              required
            ></v-text-field>

            <v-text-field
              v-model="season.discount"
              label="Pre-Registration Fee *"
              type="number"
              required
            ></v-text-field>

            <v-divider></v-divider>

            <div class="py-2">
              <p class="title">Total Amount</p>

              <p class="subheading">Cash: P {{getTotalAmount}}</p>
              <p class="subheading">Instalment: P {{getInstallmentAmount}}</p>
            </div>
            <span class="subheading">Color Code (for scheduling purpose)</span>

            <slider-picker v-model="seasonColor"></slider-picker>

          <new-course-modal ref="newCourseRef"></new-course-modal>
           </v-form>
        </v-flex>
          <v-btn
            color="success"
             @click="downloadTemplate()" 
          >
            <v-icon>mdi-arrow-collapse-down</v-icon>
            download template
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!files[0]" color="secondary">
            <v-icon class="mr-1">mdi-upload</v-icon>
            <file-upload
              :maximum="1"
              extensions=".xlsx"
              accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              name="avatar"
              class="btn btn-primary"
              post-action="/upload/post"
              :drop="!edit"
              v-model="files"
              @input-filter="inputFilter"
              @input-file="inputFile"
              ref="upload">
              Upload Template
            </file-upload>
          </v-btn>

          <v-chip v-else color="teal" text-color="white" @click="importTemplate">
            <v-avatar>
              <v-btn icon dark small>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-avatar>
            {{files[0].name}}
            <v-icon class="pl-1">mdi-send</v-icon>
          </v-chip>
        
      </v-layout>
     <!-- </v-form> -->
    </v-container>
  </div>
</template>
<script>
import { Slider } from 'vue-color'
import NewCourseModal from '@/components/courses/NewCourseModal'
import XLSX from 'xlsx'
import JsonExcel from 'vue-json-excel'
import FileUpload from 'vue-upload-component'

export default {
  components: {
    'slider-picker': Slider,
    NewCourseModal,
    FileUpload
  },
  created () {
    this.eventKey = this.$route.params.eventKey
  },
  // firestore () {
  //   return {
  //     courses: this.$fs.collection('courses'),
  //     event: this.$fs.collection('events').doc(this.eventKey)
  //   }
  // },
  mounted () {
    let vm = this
    vm.$binding('courses', vm.$fs.collection('courses'))
      .then((c) => {
        vm.$binding('event', vm.$fs.collection('events').doc(vm.eventKey))
          .then((event) => {
            console.log(event, 'event') // => __ob__: Observer
          })
      })
  },
  data: () => ({
    userHasPickedNoFiles: true,
    courses: [],
    eventKey: '',
    isValid: false,
    stepper: 1,
    menu: false,
    menu2: false,
    items: [],
    date: '',
    date2: '',
    openDialog: false,
    uploadNewSeasonBatchesModal: false,
    files: [],
    edit: false,
    
  }), // end of data
  computed: {
    season: {
      get () {
        return this.$store.state.event.season1
      },
      set (v) {
        this.$store.state.event.season = v
      }
    },
    fileAdded: function (fileList) {
      console.log('vfp:', fileList)
    },
    showUpload() {
      const event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      console.log(event)
      this.input.dispatchEvent(event)
    },
    getActivities () {
      return this.$_.flatMapDeep(this.season.course.activities, a => {
        return a.title
      }) 
    },
    seasonColor: {
      get () {
        return this.$store.state.event.seasonColor
      },
      set (v) {
        this.$store.state.event.seasonColor = v
      }
    },
    getTotalAmount () {
			try {
				let amount = parseFloat(this.season.ticketCount) * parseFloat(this.season.ticketPrice)
				let isNan = parseInt(amount) || 0
				// console.log('isnan', isNan)
				return isNan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			} catch (err) { return 0 }
    },
    getInstallmentAmount () {
			return this.$store.getters['event/getInstallmentAmount']
		},
  }, // end of computed
  methods: {
    importTemplate () {
			function get_header_row(sheet) {
				var headers = [], range = XLSX.utils.decode_range(sheet['!ref']);
				var C, R = range.s.r; /* start in the first row */
				for(C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
					var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */
					var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
					if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
					headers.push(hdr);
				}
				return headers;
			}

			function fixdata(data) {
				var o = "", l = 0, w = 10240;
				for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
				o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
				return o;
			}


			console.log(f, 'f')
			var file = this.files[0].file
			var i, f;
			console.log(file, 'files')
			var state = {
				tickets:[{name:"test"}],
				headers:["Test header"]
			}
			var worksheet2 = null
			// for (i = 0, f = files[i]; i != files.length; ++i) {
				var reader = new FileReader(),
          name = file.name
          
				reader.onload = function(e) {
					var results, 
						data = e.target.result, 	
						fixedData = fixdata(data), 
						workbook = XLSX.read(btoa(fixedData), {type: 'base64'}), 
						firstSheetName = workbook.SheetNames[0], 
						worksheet = workbook.Sheets[firstSheetName]
					state.headers = get_header_row(worksheet)	
					results = XLSX.utils.sheet_to_json(worksheet)
					state.tickets=results
				}
				reader.readAsArrayBuffer(file)
			// }
			console.log(reader, 'reader')
			console.log(state, 'worksheet2')
      console.log(new Date(43316), 'worksheet2')
      console.log(this.$store.state.event.stepper, 'stepper')
      this.$store.state.event.stepper = 2
			// this.excelData = state
			// console.log(this.excelData, 'excelData')
		},
    inputFile(newFile, oldFile, prevent) {
      //  console.log(newFile, 'inputFile')
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      // console.log(newFile, 'inputFilter')
      if (newFile && !oldFile) {
        if (!/\.(xlsx|.xlsm|.xltx)$/i.test(newFile.name)) {
          this.alert('File is not an excel')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
    downloadTemplate () {
			this.$refs.form.validate()
			if (this.isValid) {
				this.generateTemplate()
			}
		},
    generateTemplate () {
			let numberOfPayment = this.season.numOfPayment
			
			let numOfWorkshops = this.season.numOfWorkshops
			
			let courseActivities = this.season.course.activities
			console.log(courseActivities, 'course')
			// console.log(this.courses, 'courses')
			var template = new Array()
			template.push({'Batch': ''})
			for (var c of courseActivities) {
				if (c.value === 'payments' || c.value === 'payment') {
					for (var i = 1; i <= numberOfPayment; i++) {
						template.push({[`Payment ${i}`]: ''})
					}
				} else if (c.value === 'workshops' || c.value === 'workshop') {
					for (var i = 1; i <= numOfWorkshops; i++) {
						template.push({[`Workshop ${i}`]: ''})
					}
				} else if (c.actType === 'date range') {
					console.log(c, 'date range')
					template.push({[`${c.title} Start`]: ''})
					template.push({[`${c.title} End`]: ''})
				}
				else {
					template.push({[`${c.title}`]: ''})
				}
				// console.log(c, 'c')
			}
			this.uploadNewSeasonBatchesModal = true
			console.log(template, 'temp')
	
			// export json to Worksheet of Excel
			// only array possible
			var template3 = XLSX.utils.json_to_sheet(template) 
			// var pokemonWS = XLSX.utils.json_to_sheet(this.Datas.pokemons) 

			// A workbook is the name given to an Excel file
			var wb = XLSX.utils.book_new() // make Workbook of Excel

			// add Worksheet to Workbook
			// Workbook contains one or more worksheets
			XLSX.utils.book_append_sheet(wb, template3, 'template') // sheetAName is name of Worksheet

			// export Excel file
			let eventName = this.event.eventName
			let seasonNumber = this.season.seasonNumber
			XLSX.writeFile(wb, `${eventName}_Season_${seasonNumber}.xlsx`) // name of the file is 'book.xlsx'
		},
    addNewCourse () {
      this.$refs.newCourseRef.open()
        .then(res => {
          if (res) {
            console.log(res,'res')
          } else{
            console.log(res, 'else')
          }
        })
    },
    test () {
      console.log(this.files, 'files')
    }
  }// end of methods
}
</script>
<style>
input[type="file"] {
  border: 1px solid yellow;
}

input[type="file"].slotted {
  border: 1px solid rebeccapurple;
}
</style>
