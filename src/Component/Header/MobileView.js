import React from "react"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MobileMenuItem from "./MobileMenuItem"
import MobileBBSButton from "./MobileBBSButton"
import links from "./Links"

const MobileView =  (props) => {
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.isMobileMenuOpen}
      onClose={props.handleMenuClose}
    >

    <div>
    {
      links.map((linkItem)=>{
        const {content,link, address} = linkItem
        return    <MobileMenuItem
                    content={content}
                    link= {link}
                 />
      })
    }
    <MobileBBSButton
      content="BBS"
      href="http://cssanyu.org/bbs2/forum.php?mod=forumdisplay&fid=41"
    />
    </div>
    </Menu>
  );

}


export default MobileView
