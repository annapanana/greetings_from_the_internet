# greetings_from_the_internet
Galvanize Q1 Project

Deployed Project Link: http://greetingsfromtheinternet.surge.sh/

Project Brief:
Greetings from the Internet (gfti) is a postcard making tool that allows users to search for an image, modify a greetings graphic and include a custom message. The aesthetic of gfti is an homage to Teich greetings postcards, which made their debut at the 1893 World’s Columbian Exposition in Chicago.

MVP Features:
Search for Flickr images using a keyword
Select one image from the search results as the background graphic for the postcard
Superimpose “Greetings for [search term]” text on the image
Customize the framing of the text and background to mask the image
Fill out a form that includes an address and a custom message

Stretch Goals:
Save a PNG of the card to mail or give to a friend
Animations of example postcards being sent on the landing page
Customizing the font and other attributes (image processing) of the background graphic
Use the Lob API to send a physical postcard to the specified address (via my lob account)
Allow the user to preview the postcard and “flip” it to view both sides (3D animation)

API + Data:

Flickr API
Search by tagged keyword
Safe_search: true
Has_geo: true (images that have been tagged as a location)
Content_type: photo

p5.js libraray for image composition

Lob API
Postcard ID
To: Name, Address, City, State, Zip
Date Created
Postcard Front
Size

Local Storage Data
Save image file in local data to propagate across multiple pages
Save previously filled out addresses
Save previous searchers

Wireframe Link: https://github.com/annapanana/greetings_from_the_internet/tree/master/wireframes

Pivotal Tracking Link: https://www.pivotaltracker.com/n/projects/1908389

Retrospective Write-Up: https://docs.google.com/document/d/1beAeCffP8ORa1zmM_e_1vHugo_u0r5dZMx2gJc2IuBI/edit?usp=sharing
