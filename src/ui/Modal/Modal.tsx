import { memo } from 'react';
import { type typeLaunches } from '../../types/typeLaunches';
import stub from '../../assets/stub.png'
import styles from './modal.module.css';

type Props = {
  launch: typeLaunches;
};

export const Modal =  memo(({ launch }: Props) => {
    // console.log( launch.links);
    return (
        <div data-testid='modalLaunch' className={styles.modal}>

            <h3 className={styles.modal_title}>{launch.mission_name}</h3>

            <img
                src={launch.links.mission_patch || launch.links.mission_patch_small || stub}
                alt={launch.mission_name}
                className={styles.image}
            />

            <div className={styles.mission}>
                <h3 className={styles.mission_title}>Mission name:</h3>
                <p className={styles.mission_info}>{launch.mission_name}</p>
            </div>

            <div className={styles.rocket}>
                <h3 className={styles.rocket_title}>Rocket name:</h3>
                <p className={styles.rocket_info}>{launch.rocket.rocket_name}</p>
            </div>

            <div className={styles.details}>
                <h3 className={styles.details_title}>Details:</h3>
                <p className={styles.details_info}>{launch.details}</p>
            </div>
        
        </div>
    );
});
