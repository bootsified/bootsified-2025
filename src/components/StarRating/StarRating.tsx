import StarIcon from '@assets/icons/star.svg'
import StarFilledIcon from '@assets/icons/star-filled.svg'
import StarHalfIcon from '@assets/icons/star-half.svg'
import clsx from 'clsx'

import styles from './StarRating.module.css'

interface StarRatingProps {
  className?: string
  rating: number
}

const StarRating = ({ className = '', rating }: StarRatingProps) => {
  return (
    <div className={clsx(className, styles.wrapper)}>
      <span className="srOnly">{rating} of 5 stars</span>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        return (
          <div key={index} className={styles.star}>
            {/* <VisuallyHidden>{`${starValue} ${starValue === 1 ? 'star' : 'stars'}`}</VisuallyHidden> */}
            {starValue - rating < 1 && starValue - rating > 0 ? (
              <StarHalfIcon aria-hidden="true" />
            ) : starValue <= rating ? (
              <StarFilledIcon aria-hidden="true" />
            ) : (
              <StarIcon aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StarRating
