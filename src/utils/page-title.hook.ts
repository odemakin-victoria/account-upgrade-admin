import React, { useEffect } from 'react'


/**
 * 
 * Updates the page title for each layout
 * 
 * @param title 
 */
export default function UsePageTitle(title:string) {
    useEffect(() => {
        document.title = title;
      }, [title]);
}
