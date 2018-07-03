/**
 * Created by rickus on 12/31/17.
 */

import {suitsadminsurl} from '../suitsadminroot.url';

// root url for settings
const suitsettingsroot = suitsadminsurl + '/settings';

// url for access to state types

export const suitssettingsstate = suitsettingsroot + '/state';


// url for access to city types

export const suitsettingscity = suitsettingsroot + '/citybystate';

export const searchcity  = suitsettingsroot + '/city';

// url for access to neighborhoods

export const getandcreateneighborhoodsbycity = suitsettingsroot + '/neighborhoodbycity';

// url for access to edit neighborhoods

export const editdeleteneighborhood = suitsettingsroot + '/neighborhood';


// url for access to venue types
export const suitssettingsvenuetype = suitsettingsroot + '/venuetype';

// url for access to cuisines

export const suitssettingscuisine = suitsettingsroot + '/cuisine';

// url for access to menu styles

export const suitssettingmenustyle = suitsettingsroot + '/menustyle';

// url for access to experiential types

export const suitssettingsexperientialtypes = suitsettingsroot + '/experientialtype';

// url for access to event purpose types

export const suitssettingseventpurposetypes = suitsettingsroot + '/eventpurpose';


// url for access to venue application decline reasons

export const suitsettingsvadr = suitsettingsroot + '/vadr';

// url for getting all neighborhoods and cities nested
