/**
 * Created by rickus on 1/25/18.
 */

import {suitsadminsurl} from '../suitsadminroot.url';

// root url for venueapplication

 const venueapplicationroot = suitsadminsurl + '/venue';

export const getvenueapplication = venueapplicationroot + '/venueapplication'; // plus pk

// url for create venue

// get edit delete unapproved venue
 export const editdeleteunapprovedvenue = venueapplicationroot + '/unapprovedvenue';

export const createnewvenue = venueapplicationroot  + '/venue';

// url for get venue coordinates

export const venuegetcoordinates = venueapplicationroot + '/venueaddresscoordinates';

// url for reject venue application (delete)

export const  declinevenueapplicationdeletedeclinedvenueapplication = venueapplicationroot + '/decline';
// sets the decline flag to true with decline reason and decline text for view in the declined venues details page.


