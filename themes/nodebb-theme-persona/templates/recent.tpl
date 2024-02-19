<!-- IMPORT partials/breadcrumbs.tpl -->
<style>
    /* Customize the input field */
    .form-control {
        border: 2px solid #007bff; /* Blue */
        border-right: none;
        padding: 10px; 
        border-radius: 5px 0 0 5px; /* Rounded corners for the left side */
    }

    /* Customize the search button on the recent page*/
    .search-button {
        background-color: #007bff; /* Blue*/
        border: 2px solid #007bff;
        border-left: none;
        padding: 9px 12px;
        border-radius: 0 15px 15px 0; /* Rounded corners for the right side*/
        cursor: pointer; /* mouse cursor when hovering */
    }

    /* updates when buttons is being hovered over*/
    .search-button:hover, .search-button:focus {
        background-color: #0056b3; /* blue */
        outline: none; 
    }

</style>
<div data-widget-area="header">
    {{{each widgets.header}}}
    {{widgets.header.html}}
    {{{end}}}
</div>
<div class="recent">

    <div class="row">
        <div class="col-lg-12">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="[[global:search]]" id="tag-search">
                <span class="input-group-addon search-button"><i class="fa fa-search"></i></span>
            </div>
        </div>
    </div>
    
    <div class="topic-list-header btn-toolbar">
        <div class="pull-left">
            <!-- IF canPost -->
            <!-- IMPORT partials/buttons/newTopic.tpl -->
            <!-- ELSE -->
            <a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
            <!-- ENDIF canPost -->
            <a href="{config.relative_path}/{selectedFilter.url}" class="inline-block">
                <div class="alert alert-warning hide" id="new-topics-alert"></div>
            </a>
        </div>

        <div class="btn-group pull-right">
        <!-- IMPORT partials/category/tools.tpl -->
        </div>

        <!-- IMPORT partials/category-filter-right.tpl -->

        <div class="btn-group pull-right bottom-sheet <!-- IF !filters.length -->hidden<!-- ENDIF !filters.length -->">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <span class="visible-sm-inline visible-md-inline visible-lg-inline">{selectedFilter.name}</span><span class="visible-xs-inline"><i class="fa fa-fw {selectedFilter.icon}"></i></span> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu">
                {{{each filters}}}
                <li role="presentation" class="category {{{if filters.selected}}}selected{{{end}}}">
                    <a role="menu-item" href="{config.relative_path}/{filters.url}"><i class="fa fa-fw <!-- IF filters.selected -->fa-check<!-- ENDIF filters.selected -->"></i>{filters.name}</a>
                </li>
                {{{end}}}
            </ul>
        </div>
    </div>

    <div class="category">
        <!-- IF !topics.length -->
        <div class="alert alert-warning" id="category-no-topics">[[recent:no_recent_topics]]</div>
        <!-- ENDIF !topics.length -->

        <!-- IMPORT partials/topics_list.tpl -->

        <!-- IF config.usePagination -->
            <!-- IMPORT partials/paginator.tpl -->
        <!-- ENDIF config.usePagination -->
    </div>
</div>
