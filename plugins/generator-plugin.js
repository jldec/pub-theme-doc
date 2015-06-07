module.exports = function(generator) {

  var u = generator.util;
  var opts = generator.opts;
  var hb = generator.handlebars;

  hb.registerHelper('navIcon', function(frame) {

    return defaultFragmentHtml('/#navicon',
      '_!bars fw lg_',
      '<span class="icon">=</span>',
      frame);
  });

  hb.registerHelper('docTitle', function(frame) {
    var title = opts.docTitle ||
      (opts.pkgJson && opts.pkgJson.name) ||
      'pub-server';

    var subTitle = opts.docSubTitle || '';

    return defaultFragmentHtml('/#doctitle',
      '# [' + title + '](/)\n' + subTitle,
      '<h1><a href="/">' + u.escape(title) + '</a></h1>' + subTitle,
      frame);
  });

  hb.registerHelper('topMenu', function(frame) {
    var url = opts.github || githubUrl();

    return defaultFragmentHtml('/#topmenu',
      url ? '- [_!github lg fw_](' + url + ' "github")' : '',
      url ? '<ul><li><a href="' + url + '">github</a></li></ul>' : '',
      frame);
  });


  // try user-provided fragment, then faMarkdown with font-awesome, then html
  function defaultFragmentHtml(fragmentName, faMarkdown, html, frame) {

    var f = generator.fragment$[fragmentName];
    if (f) return fragmentHtml(f, frame);

    if (faMarkdown && u.find(opts.pkgs, function(pkg) {
      return /pub-pkg-font-awesome$/i.test(
        (pkg.pkgJson && pkg.pkgJson.name) || pkg.dir);
    })) {
      return fragmentHtml( {_txt:faMarkdown,
        _href:'/#synthetic' }, frame, {noWrap:1});
    }

    return html;
  }

  function fragmentHtml(fragment, frame, opts) {
    return generator.renderHtml(fragment, hb.renderOpts(frame, opts));
  }

  function githubUrl() {
    var url = opts.pkgJson && opts.pkgJson.repository && opts.pkgJson.repository.url;
    var match;
    if (url && (match = url.match(/git:\/\/(github\.com.*)\.git$/i))) {
      return 'https://' + match[1];
    }
  }
}