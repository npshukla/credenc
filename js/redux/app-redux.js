import { Platform } from 'react-native';



// How many images to pre fetch
const PREFETCH_IMAGES = 5;

// API URL
const API = 'http://thecatapi.com/api/images/get?format=src';

// Initial state
export const initialState = {
  
  next: []
};

// Reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle API response with data object that looks like { gif: 'data:image/gif;base64,...' }
    case 'IMAGE_LOADED':
      return {
        ...state,
        // update current image if it's empty
        
        next: [
          action.data,              // put image an the beginning of next array
          ...state.next,            // put the existing images after
        ]
      };
    // Change current image with the next one
    case 'CHANGE_IMAGE':
      // Do nothing if next array is empty.
      // Just keep the current image till the new one is fetched.
      if (!state.next.length) {
        return state;
      }
      return {
        ...state,                   // keep the existing state,
                     // get fist item from next array
        next: [
          ...state.next+1,  // drop first item from next array
        ],
      };
    // Handle API request errors
    case 'ERROR':
      return state;                 // do nothing
    default:
      return state;
  }
};

// Fetch next random image action
export const fetchImage = () => async (dispatch, getState) => {
 
 dispatch({
      type: 'IMAGE_LOADED',
      data: "image",
    });
 
 
 
};

// Change image to tne next one
export const changeImage = () => (dispatch, getState) => {
  dispatch({ type: 'CHANGE_IMAGE' });
  // Fetch more images if needed
  if (getState().next.length < PREFETCH_IMAGES) {
    dispatch(fetchImage());
  }
};