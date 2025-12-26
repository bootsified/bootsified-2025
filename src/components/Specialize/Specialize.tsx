import { v4 as uuidv4 } from 'uuid'

import StarRating from '../StarRating'
import { skillRatings } from './data'

import styles from './Specialize.module.css'

const Specialize = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>I specialize in&hellip;</h2>
        <div className={styles.tables}>
          {skillRatings.map(category => (
            <div key={category.id} className={styles.table}>
              <h3 className={styles.tableHeading}>{category.category}</h3>
              <table>
                <thead className="srOnly">
                  <tr>
                    <th>Skill</th>
                    <th>Skill Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {category.skills.map(skill => (
                    <tr key={uuidv4()}>
                      <td>{skill.skill}</td>
                      <td>
                        <div className={styles.stars}>
                          <StarRating rating={skill.rating} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Specialize
