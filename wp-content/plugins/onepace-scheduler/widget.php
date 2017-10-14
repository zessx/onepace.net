<?php

/*
Plugin Name: One Pace Scheduler
Plugin URI: http://onepace.net/
Description: Lists upcoming episodes.
Author: Sewil
Version: 1
Author URI: http://onepace.net/
*/

include_once $_SERVER['DOCUMENT_ROOT'] . '/server/get_scheduled.php';

class onepace_scheduler extends WP_Widget {
    function onepace_scheduler() {
        parent::WP_Widget(false, $name = __('One Pace Scheduler', 'wp_widget_plugin'));
    }
    
    // widget form creation
    function form($instance) {
        // Check values
        $epnum    = isset( $instance['epnum'] ) ? absint( $instance['epnum'] ) : 5;
        if( $instance) {
            $title = esc_attr($instance['title']);
        } else {
            $title = '';
        }
        ?>
        <p>
        <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'wp_widget_plugin'); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
        <p>
        <label for="<?php echo $this->get_field_id('epnum'); ?>"><?php _e('Limit:', 'wp_widget_plugin'); ?></label>
        <input class="tiny-text" id="<?php echo $this->get_field_id('epnum'); ?>" name="<?php echo $this->get_field_name('epnum'); ?>" type="number" step="1" min="1" value="<?php echo $epnum; ?>" size="3">
        </p>
        <?php
    }
    // display widget
    function widget($args, $instance) {
        extract( $args );

        // these are the widget options
        $title = apply_filters('widget_title', $instance['title']);
        $limit = $instance['epnum'];
        echo $before_widget;

        // Display the widget
        echo $before_title . $title . $after_title;
        ?>
        <ul>
            <?php
            $rows = get_scheduled::get_data($limit);

            foreach($rows as $row) {
                $time = strtotime($row['scheduled_for']);
                $diff = $time - time();
                $date = '';
                
                if($diff >= 365*24*3600) {
                    $date = 'Upcoming';
                } else {
                    $day = 3600*24;
                    $days = floor($diff / $day);
                    $hours = floor(($diff-$days*$day)/3600);
                    $minutes = round(($diff-$days*$day-$hours*3600)/60);

                    $dayString = $days > 0 ? "$days day" . ($days == 1 ? "" : "s") : "";
                    $hourString = $hours > 0 ? ($days > 0 ? ", " : "") . "$hours hour" . ($hours == 1 ? "" : "s") : "";
                    $minuteString = $days <= 0 ? ($hours > 0 ? ", " : "") . "$minutes minute" . ($minutes == 1 ? "" : "s") : "";
                    $date = $dayString . $hourString . $minuteString;

                    $date_title = date("Y-m-d H:i", strtotime($row['scheduled_for']));
                }

                $status = $row['status'];
                if(!empty($status)) {
                    $date .= " ($status)";
                }

                if (strlen($row['chapters']) == 0) {
                    $ep_title = $row['title'];
                } else {
                    $ep_title = "Chapter " . $row['chapters'];
                }

                ?>
                <li>
                    <?php echo $ep_title; ?>
                    <br />
                    <span style="font-size:13px;" <?php echo (!empty($date_title) ? " title=\"$date_title\"" : ""); ?>>
                        <?php echo $date; ?>
                    </span>
                </li>
                <?php
            }
            ?>
        </ul>
        <?php
        echo $after_widget;
    }
    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        // Fields
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['epnum'] = strip_tags($new_instance['epnum']);
        return $instance;
    }
}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("onepace_scheduler");'));
?>