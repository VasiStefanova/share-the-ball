import Avatar from '../../elements/Avatar/Avatax';
import './Header.css';

const Header = () => {
  return (
    <div className="headerBox">
      <div className='logoBox'>
        {/* replace h3 on next line with real logo */}
        <h3 style={{ color: 'white', margin: '0px' }}>Logo</h3>
      </div>
      <Avatar />
    </div>
  );
};

export default Header;
