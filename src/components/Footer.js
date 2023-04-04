import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <section>
        <div>
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="drinkIcon.svg"
            />
          </Link>
          <Link to="/meals">
            <img
              data-testid="meals-bottom-btn"
              src={ mealIcon }
              alt="mealIcon.svg"
            />
          </Link>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
