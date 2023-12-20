import React from 'react';
import HelpBubble from '../Assets/helpBubble.svg';

export function HelpBubbleIcon({ className }: { className?: string}) {
  return (
      <img className={className} alt="MyFriendBen Help Bubble Icon" src={HelpBubble}  
      style={{ height: '20px', width: '20px' }} 
      />
  );
}
