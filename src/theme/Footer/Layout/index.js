import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { SocialIcon } from 'react-social-icons';
export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className='flex flex-wrap justify-between space-x-4 mx-4'>
        <div name='compliance' className='flex flex-col'>
          <div>
            <img className='m-2' src="/img/Blue-Nexa-white-600.png" style={{ width: 100, height: 50 }} />
          </div>
          <div>NEXA Mortgage LLC NMLS# 1660690 | AZMB - 0944059</div>
          <div>Aaron Conway NMLS# 2087178 | AZMB - 1019790 </div>
          <div>Email: aconway@nexamortgage.com</div>
          <div>Phone: (480) 716-6234</div>
          <img className='m-2' src="/img/EHL-white.png" style={{ width: 60, height: 60 }} />
        </div>
        <div name='address' className='flex flex-col'>
          <div className='text-md font-bold my-2'>Address</div>
          <div>3100 W Ray Road #201</div>
          <div>Office #209</div>
          <div>Chandler, AZ 85226</div>
        </div>
        <div className='flex flex-col'>
          <div className='text-md font-bold my-2'>Compliance</div>
          <Link className='text-gray-300' to='https://nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/1660690'>NMLS Consumer Access</Link>
          <Link className='text-gray-300' to='/about/texas-complaint'>Texas Complaint Notice</Link>
          <Link className='text-gray-300' to='/about/privacy-policy'>Privacy Policy</Link>
          <Link className='text-gray-300' to='/about/licensing'>Licensing</Link>
        </div>
        <div name='socialMedia' className='flex flex-col space-y-2'>
          <div className='text-md font-bold my-2'>Social Media</div>
          <SocialIcon url='https://facebook.com/aaronconwaylo' fgColor='#FFFFFF' style={{ height: 30, width: 30 }} />
          <SocialIcon url='twitter.com/aaronconwaylo' fgColor='#FFFFFF' style={{ height: 30, width: 30 }} />
          <SocialIcon url='instagram.com/aaronconway' fgColor='#FFFFFF' style={{ height: 30, width: 30 }} />
        </div>
      </div>
      {(logo || copyright) && (
        <div className="my-4 footer__bottom text--center">
          {logo && <div className="margin-bottom--sm">{logo}</div>}
          {copyright}
        </div>
      )}
    </footer>
  );
}
