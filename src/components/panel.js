import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Context } from "../context";

import '../interface/css/panel.scss';

import Level from './panel/status/level';
import Progress from './panel/status/progress';
import Hearthstone from './panel/status/hearthstone';
import Tab from './panel/tab';
import Objectives from './panel/objectives/objectives';
import Quests from './panel/quests/quests';

function Panel() {

   // LOCAL STATE
   const [local, set_local] = useState({
      objectives: true,
      quests: false
   });

   // TOGGLE PANEL CONTENT
   const toggle = () => {
      set_local({
         objectives: !local.objectives,
         quests: !local.quests
      });
   }

   return (
      <div id='panel'>
         <div id='status'>
            <Level />
            <Progress />
            <Hearthstone />
            <div id='panel-menu' className='split'>
               <Tab
                  label={ 'Objectives' }
                  func={ toggle }
                  selected={ local.objectives }
               />
               <Tab
                  label={ 'Quests' }
                  func={ toggle }
                  selected={ local.quests }
               />
               <Copy />
            </div>
         </div>
         <div id='logs'>
            <div id='overflow-fix'>
               <Objectives visible={ local.objectives } />
               <Quests visible={ local.quests } />
            </div>
         </div>
      </div>
   )
}

// COPY TO CLIPBOARD
function Copy() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   const message = () => {
      dispatch({
         type: 'show-message',
         payload: {
            type: 'good',
            value: 'link copied to clipboard'
         }
      })
   }

   return (
      <CopyToClipboard text={ 'http://dungeon.bluemx.de/' + state.data.race + '/' + state.current } onCopy={ message }>
         <div id={ 'link' }>Link</div>
      </CopyToClipboard>
   )
}

export default Panel;