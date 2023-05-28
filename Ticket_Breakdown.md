# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

###Assumptions made
- The API service is structured in 3 layers, application, logic and data. 
Application layer is exposed with a API contract for the clients who use these.
All business logic goes in logic layer
Serializing, De-serializing and making changes to database part goes in data layer.
- Feature Flagging: Assuming some kind of feature flagging mechanism already exists.
Using feature flagging for development to make tickets independent 
to pick from each other. Flag will be off for production env and new API contract will 
be hidden to use. Flag will be ON on development environment for testing. 
 

###Ticket 1
####Title 
Agent Schema: update id type 
####Details 
- Update Schema to have both uuid and custom string as Agent id
 
####Acceptance Criteria
- Should be Backwards compatible

####Estimated Points: 1

###Ticket 2
####Title  
Logic layer: Accept custom id for agents while create
####Details 
- Accept optional optional custom id parameter in Agents logic layer create function
- if custom id not passed(as its optional), keep the existing flow
- if custom id present, Check if custom id already exists by calling Agent's data layer getById function
- if exists Throw unique id exception
- if doesn't exists call Agent's data layer create function with custom id along with other details 
 
####Acceptance Criteria
- Unit tests updated
- Should be Backwards compatible

####Estimated Points: 3

###Ticket 3
####Title 
Data layer: Accept optional custom id for agents while create
####Details 
- Accept optional custom id parameter in Agents data layer create function
- if custom id not passed(as its optional), keep the existing flow of generating id
- if custom id present, save Agent data with custom id 
 
####Acceptance Criteria
- Unit tests updated

####Estimated Points: 2

###Ticket 4
####Title 
API layer: Accept optional custom id for agents
####Details 
Add below under the feature flag.
- Create feature flag "agent_custom_id"
- Accept optional custom id parameter in Agents application layer create API
- Pass the custom id to Agent's Logic layer create function 
- Update API contract
 
####Acceptance Criteria
- API contract for clients should be updated but under feature flag

####Estimated Points: 3

###Ticket 5
####Title 
Verify report Report generation
####Details 
- Reports are generated with Agent custom Id
 
####Acceptance Criteria
- Reports are generated with Agent custom Id
####Blocked by
Ticket 1, 2,3,4

####Estimated Points: 1

###Ticket 6 
(later in the backlog, to be picked after the successful release)
####Title 
Remove Feature Flag "agent_custom_id"
####Details 
- Clean code and remove "agent_custom_id" in Agent's API layer and API contract
 
####Acceptance Criteria
- API contract for clients should be updated but under feature flag

####Estimated Points: 1
