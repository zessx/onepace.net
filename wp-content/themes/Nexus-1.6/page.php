<?php get_header(); ?>

<div class="page-wrap container">
	<div id="main-content">
		<div class="main-content-wrap clearfix">
			<div id="content">
				<?php get_template_part( 'includes/breadcrumbs', 'index' ); ?>

				<div id="left-area">

				<?php while ( have_posts() ) : the_post(); ?>

					<article class="entry-content clearfix">
                                        <h1 class="main-title"><?php the_title(); ?></h1>
					<?php
						the_content();

						wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'Nexus' ), 'after' => '</div>' ) );
					?>
					</article> <!-- .entry -->

					<?php
						if ( comments_open() && 'on' == et_get_option( 'nexus_show_pagescomments', 'false' ) )
							comments_template( '', true );
					?>

				<?php endwhile; ?>

				</div> 	<!-- end #left-area -->
			</div> <!-- #content -->

			<?php get_sidebar(); ?>
		</div> <!-- .main-content-wrap -->

		<?php get_template_part( 'includes/footer-banner', 'page' ); ?>
	</div> <!-- #main-content -->

	<?php get_footer(); ?>