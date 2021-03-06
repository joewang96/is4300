$(document).ready(function(){
	window.setTimeout(function(){
		$('nav.nav-bar .brand-icon').addClass("activate");
	}, 250);
});

// --------------- Vue Components Section --------------
Vue.component('content-feed', {
    template: `<div id="content-feed" class="flex-parent">
    		<div class="color-key">
    			<p class="text-center"><span class="key-block individual"></span>: Individual <span class="key-block critique"></span>: Critique <span class="key-block project"></span>: Project</p>
    		</div>
    		<div class="group bottom">
	    		<h3 class="text-center heading">Search Results</h3>
	    		<p v-if="results == 0" class="empty-result text-center">Nothing to show here</p>
	    		<div class="content-block" v-else v-for="obj in results" v-bind:class="obj.type">
	        		<p class="title">{{ obj.title }}</p>
	        		<p class="description">{{ obj.desc }}</p>
	        		<div class="content">
	    				<a v-for="file in obj.content" v-bind:href="file.filepath" target="_blank">
	        				<button>
	        					{{ file.text }}
	        				</button>
	        			</a>
	        		</div>
	        	</div>
        	</div>

        	<div class="group">
	    		<h3 class="text-center heading">All Assignments</h3>
		        <div class="content-block" v-for="obj in content" v-bind:class="obj.type">
	        		<p class="title">{{ obj.title }}</p>
	        		<p class="description">{{ obj.desc }}</p>
	        		<div class="content">
	    				<a v-for="file in obj.content" v-bind:href="file.filepath" target="_blank">
	        				<button>
	        					{{ file.text }}
	        				</button>
	        			</a>
	        		</div>
	        	</div>
	        </div>
	    </div>
	</div>`,
    data: function() {
        return {
            content: [
            	{
					"type": "individual",
					"title": "Individual HW 7: Heuristic Evaluation",
					"desc": "This is a heuristic evaluation for Unteractive based on Neilson's 10 Heursitics. Below is a link to the PDF version of my critique of the interface.",
					"content": [
						{
							"filepath": "files/i7_eval.pdf",
							"text": "Heuristic Evaluation PDF"
						}
					]
				},
            	{
					"type": "individual",
					"title": "Individual HW 1: Project Brainstorming",
					"desc": "Pick three different project ideas that you would be interested in working on, make a rough sketch of a user interface (a scanned or photographed sketch on paper is best) and write a 1 paragraph proposal for each, further fleshing out the idea. Post your write-ups and sketches on a web page in your order of preference.",
					"content": [
						{
							"filepath": "https://docs.google.com/document/d/1DWbYOKIBeK5iVXt2vZK-pMHcBOeiy4dCM3QnJRQRhlA/edit?usp=sharing",
							"text": "Write Up & Sketches"
						}
					]
				}
            ],
            results: []
        }
    },
    props: {
    	'search': String
    },
    methods: {
        searchResults: function() {
        	var search = this.search;
        	if (search == "") {
        		return [];
        	} else {
        		return this.content.filter(function(item) {
	                return (item.type.toLowerCase().includes(search.toLowerCase())) || 
	                (item.title.toLowerCase().includes(search.toLowerCase())) || 
	                (item.desc.toLowerCase().includes(search.toLowerCase()));
	            });
        	}
        }
    },
    watch: {
    	search: function() {
    		this.results = this.searchResults();
    	}
    }
});

// ----------------------------------------------------

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
	data: {
		search: ""
	}
}).$mount('#app');


