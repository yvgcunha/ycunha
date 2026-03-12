-- =============================================
-- SEED: Morning Brief — Fontes de Notícias
-- Importado de: ~/Desktop/Morning Brief/Radar de Notícias - sources.csv
--
-- Uso: execute após criar o usuário no Supabase.
-- Substitua 'YOUR_USER_ID' pelo seu auth.users.id
-- =============================================

-- Helper: insert Morning Brief sources for a given user
create or replace function public.seed_morning_brief_sources(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.news_sources (user_id, name, url, feed_url, category, enabled)
  values
    -- Economia BR
    (p_user_id, 'G1 Economia',             'https://g1.globo.com/economia/',               'https://g1.globo.com/rss/g1/economia/feed.xml',                     'economia',   true),
    (p_user_id, 'InfoMoney',               'https://www.infomoney.com.br/',                'https://www.infomoney.com.br/feed/',                                'economia',   true),
    (p_user_id, 'Brazil Journal',          'https://braziljournal.com/',                   'https://braziljournal.com/feed/',                                   'mercado',    true),
    (p_user_id, 'Valor Econômico',         'https://valor.globo.com/',                     'https://valor.globo.com/rss/valor-economico/feed.xml',              'economia',   true),
    (p_user_id, 'NeoFeed',                 'https://neofeed.com.br/',                      'https://neofeed.com.br/feed/',                                      'mercado',    true),
    (p_user_id, 'Exame',                   'https://exame.com/',                           'https://exame.com/feed/',                                           'mercado',    true),
    (p_user_id, 'Money Times',             'https://www.moneytimes.com.br/',               'https://www.moneytimes.com.br/feed/',                               'mercado',    true),
    (p_user_id, 'Seu Dinheiro',            'https://www.seudinheiro.com/',                 'https://www.seudinheiro.com/feed/',                                 'mercado',    true),
    (p_user_id, 'Estadão Economia',        'https://economia.estadao.com.br/',             'https://economia.estadao.com.br/rss/ultimas-noticias,72.xml',       'economia',   true),

    -- Global Finance
    (p_user_id, 'CNN Business',            'https://www.cnn.com/business',                 'https://rss.cnn.com/rss/money_latest.rss',                          'global',     true),
    (p_user_id, 'Wall Street Journal',     'https://www.wsj.com/',                         'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',                    'global',     true),
    (p_user_id, 'Financial Times',         'https://www.ft.com/',                          'https://www.ft.com/rss/home',                                       'global',     true),
    (p_user_id, 'Bloomberg',               'https://www.bloomberg.com/',                   'https://feeds.bloomberg.com/markets/news.rss',                      'global',     true),
    (p_user_id, 'The Economist',           'https://www.economist.com/',                   'https://www.economist.com/rss/the_economist_full_rss.xml',          'global',     true),
    (p_user_id, 'CNBC',                    'https://www.cnbc.com/',                        'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114', 'global', true),
    (p_user_id, 'Reuters Business',        'https://www.reuters.com/business/',            'https://feeds.reuters.com/reuters/businessNews',                    'global',     true),
    (p_user_id, 'Washington Post Business','https://www.washingtonpost.com/business/',     'https://feeds.washingtonpost.com/rss/business',                     'global',     true),

    -- Tecnologia
    (p_user_id, 'TechCrunch',             'https://techcrunch.com/',                       'https://techcrunch.com/feed/',                                      'tecnologia', true),
    (p_user_id, 'VentureBeat',            'https://venturebeat.com/',                      'https://venturebeat.com/feed/',                                     'tecnologia', true),
    (p_user_id, 'MIT Technology Review',  'https://www.technologyreview.com/',             'https://www.technologyreview.com/feed/',                            'tecnologia', true),
    (p_user_id, 'Wired',                  'https://www.wired.com/',                        'https://www.wired.com/feed/rss',                                    'tecnologia', true),
    (p_user_id, 'Ars Technica',           'https://arstechnica.com/',                      'https://feeds.arstechnica.com/arstechnica/index',                   'tecnologia', true),

    -- Startups & VC
    (p_user_id, 'Hacker News',            'https://news.ycombinator.com/',                 'https://hnrss.org/frontpage',                                       'startups',   true),
    (p_user_id, 'CB Insights',            'https://www.cbinsights.com/',                   'https://www.cbinsights.com/research/feed/',                         'startups',   true),
    (p_user_id, 'Sifted',                 'https://sifted.eu/',                            'https://sifted.eu/rss',                                             'startups',   true),
    (p_user_id, 'a16z Blog',              'https://a16z.com/',                             'https://a16z.com/feed/',                                            'startups',   true),
    (p_user_id, 'First Round Review',     'https://review.firstround.com/',               'https://review.firstround.com/feed.xml',                            'startups',   true),
    (p_user_id, 'NFX Blog',              'https://www.nfx.com/blog',                       'https://www.nfx.com/blog/rss.xml',                                  'startups',   true),
    (p_user_id, 'Not Boring',            'https://www.notboring.co/',                      'https://www.notboring.co/feed',                                     'startups',   true),
    (p_user_id, 'The Generalist',        'https://www.thegeneralist.com/',                 'https://www.thegeneralist.com/feed',                                'startups',   true),

    -- Fintech & Pagamentos
    (p_user_id, 'Finextra',              'https://www.finextra.com/',                      'https://www.finextra.com/rss/headlines.aspx',                       'fintech',    true),
    (p_user_id, 'PYMNTS',               'https://www.pymnts.com/',                         'https://www.pymnts.com/feed/',                                      'fintech',    true),
    (p_user_id, 'The Paypers',          'https://thepaypers.com/',                         'https://thepaypers.com/rss',                                        'fintech',    true),
    (p_user_id, 'Fintech Futures',      'https://www.fintechfutures.com/',                 'https://www.fintechfutures.com/feed/',                              'fintech',    true),
    (p_user_id, 'Tearsheet',            'https://tearsheet.co/',                           'https://tearsheet.co/feed/',                                        'fintech',    true),
    (p_user_id, 'Payments Dive',        'https://www.paymentsdive.com/',                   'https://www.paymentsdive.com/feeds/news/',                          'pagamentos', true),
    (p_user_id, 'Banking Dive',         'https://www.bankingdive.com/',                    'https://www.bankingdive.com/feeds/news/',                           'pagamentos', true),
    (p_user_id, 'The Financial Brand',  'https://thefinancialbrand.com/',                  'https://thefinancialbrand.com/feed/',                               'banking',    true),

    -- Produto
    (p_user_id, 'Product Hunt',         'https://www.producthunt.com/',                    'https://www.producthunt.com/feed',                                  'produto',    true),
    (p_user_id, 'Product School Blog',  'https://productschool.com/blog/',                 'https://productschool.com/blog/feed/',                              'produto',    true),
    (p_user_id, 'Mind the Product',     'https://www.mindtheproduct.com/',                 'https://www.mindtheproduct.com/feed/',                              'produto',    true),
    (p_user_id, 'Product Coalition',    'https://productcoalition.com/',                   'https://productcoalition.com/feed',                                 'produto',    true),
    (p_user_id, 'Product Led Alliance', 'https://www.productledalliance.com/',             'https://www.productledalliance.com/feed/',                          'produto',    true),
    (p_user_id, 'Product Gurus',        'https://www.productgurus.com.br/',                'https://www.productgurus.com.br/feed/',                             'produto',    true),
    (p_user_id, 'Product Ride',         'https://productride.substack.com/',               'https://productride.substack.com/feed',                             'produto',    true),

    -- Newsletters / Análise
    (p_user_id, 'MicroSaaS',            'https://microsaas.substack.com/',                 'https://microsaas.substack.com/feed',                               'startups',   true),
    (p_user_id, 'João Torres Substack',  'https://jocatorres.substack.com/',               'https://jocatorres.substack.com/feed',                              'startups',   true),
    (p_user_id, 'Lenny''s Newsletter',  'https://www.lennysnewsletter.com/',               'https://www.lennysnewsletter.com/feed',                             'produto',    true),
    (p_user_id, 'The Diff',             'https://www.thediff.co/',                         'https://www.thediff.co/feed',                                       'mercado',    true),
    (p_user_id, 'Stratechery',          'https://stratechery.com/',                        'https://stratechery.com/feed/',                                     'tecnologia', true)

  on conflict do nothing;
end;
$$;

grant execute on function public.seed_morning_brief_sources(uuid) to authenticated;

-- =============================================
-- Para usar: no SQL Editor do Supabase, execute:
-- select public.seed_morning_brief_sources('SEU_USER_ID_AQUI');
-- =============================================
