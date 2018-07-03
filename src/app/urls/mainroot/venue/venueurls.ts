/**
 * Created by rickus on 12/28/17.
 */
/*

all urls to the backend for all actions in getting, putting, and posting venue objects
 */

import {rooturl} from '../../rooturl';
import {mainroot} from "../mainrooturl";


const venuesroot = rooturl + mainroot + 'venue/';

// create unapproved venue

export const unapprovedvenuecreate = venuesroot;

export const browsevenuesroot = unapprovedvenuecreate;
