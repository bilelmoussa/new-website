const isEmail = (emailVal: string) => {
  const tlds = `.ac .ad .ae .af .ag .ai .al 
  .am .an .ao .aq .ar .as .at .au .aw .ax 
  .az .ba .bb .bd .be .bf .bg .bh .bi .bj 
  .bm .bn .bo .br .bs .bt .bu .bv .bw .by 
  .bz .ca .cc .cd .cf .cg .ch .ci .ck .cl 
  .cm .cn .co .cr .cs .cu .cv .cx .cy .cz 
  .dd .de .dj .dk .dm .do .dz .ec .ee .eg 
  .eh .er .es .et .eu .fi .fj .fk .fm .fo 
  .fr .ga .gb .gd .ge .gf .gg .gh .gi .gl 
  .gm .gn .gp .gq .gr .gs .gt .gu .gw .gy 
  .hk .hm .hn .hr .ht .hu .id .ie .il .im 
  .in .io .iq .ir .is .it .je .jm .jo .jp 
  .ke .kg .kh .ki .km .kn .kp .kr .kw .ky 
  .kz .la .lb .lc .li .lk .lr .ls .lt .lu 
  .lv .ly .ma .mc .md .mg .mh .mk .ml .mm 
  .mn .mo .mp .mq .mr .ms .mt .mu .mv .mw 
  .mx .my .mz .na .nc .ne .nf .ng .ni .nl 
  .no .np .nr .nu .nz .om .pa .pe .pf .pg 
  .ph .pk .pl .pm .pn .pr .ps .pt .pw .py 
  .qa .re .ro .ru .rw .sa .sb .sc .sd .se 
  .sg .sh .si .sj .sk .sl .sm .sn .so .sr 
  .st .su .sv .sy .sz .tc .td .tf .tg .th 
  .tj .tk .tl .tm .tn .to .tp .tr .tt .tv 
  .tw .tz .ua .ug .uk .um .us .uy .uz .va 
  .vc .ve .vg .vi .vn .vu .wf .ws .ye .yt 
  .yu .za .zm .zr .zw .com .net .org .mil 
  .gov .edu .nato .info .int .name .biz 
  .museum .pro`;

  let email = emailVal;
  email = email.replace(/^\s+|\s+$/, '');
  const rex = new RegExp('^[A-Za-z0-9.-_]+@[A-Za-z0-9.-_]+.[A-Za-z]+$');
  const endofString = email.split('.');
  const ending = endofString.length - 1;
  const tld = endofString[ending];
  if (! email.match(rex)) {
    return false;
  } else if (tlds.search(tld) < 0) {
    return false;
  } else {
    return true;
  }
};

export default isEmail;
