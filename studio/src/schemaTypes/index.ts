import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {project} from './documents/project'
import {location} from './documents/location' 
import {property} from './documents/property'
import {partner} from './documents/partner' 
import {grant} from './documents/grant' 
import {task} from './documents/task' 
import {walletTransaction} from './documents/walletTransaction'
import {module} from './documents/module' 
import {event} from './documents/event'   
import {resource} from './documents/resource' 
import {composerProfile} from './documents/composerProfile'
import {musicalWork} from './documents/musicalWork'
import {ngoPod} from './documents/ngoPod'   
import {childDevelopmentLogEntry} from './objects/childDevelopmentLogEntry'
import { videoAsset } from './objects/videoAsset'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  project,
  page,
  post,
  location,
  property,
  partner,
  grant,
  task,
  walletTransaction,
  module,
  event,
  resource,
  composerProfile,         
  musicalWork,             
  ngoPod,                  
  person,
  // Objects
  blockContent,
  childDevelopmentLogEntry, 
  infoSection,
  callToAction,
  link,
  videoAsset,
]