"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
const favArray = [];

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  
  return $(`
      
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}
/**Handle the form submit when adding a new story */

function formSubmit() {
  Array.from(document.querySelectorAll('#story-form'))
  .reduce((acc, input) =>
  ({...acc, [input.id]: input.value}), {});
  addStory();
  
}

const submitEntry = document.getElementById('add-story');
submitEntry.addEventListener('click', formSubmit)


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    const favoriteStar = document.createElement('span')
    favoriteStar.className = 'far fa-star';
    $story.append(favoriteStar);
    $allStoriesList.append($story);

    favoriteStar.addEventListener('click', function() {
     
      if (favoriteStar.classList.contains('fas')) {
        //storyList is an array of all of the stories that are on the page
        //if the star is clicked it's colored in and pushed to the favArray
        
        const favoriteList = document.getElementById('favorites')
    


        favoriteStar.classList.remove('fas');
        favoriteStar.classList.add('far')
      }
      else {
        this.classList.remove('far');
        this.classList.add('fas');
      } 
  })
  $allStoriesList.show();
}
}
