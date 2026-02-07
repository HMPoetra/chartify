<?php

namespace Config;

use CodeIgniter\Config\Filters as BaseFilters;
<<<<<<< HEAD
use CodeIgniter\Filters\Cors;
=======
use App\Filters\Cors;
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\PageCache;
use CodeIgniter\Filters\PerformanceMetrics;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseFilters
{
    /**
<<<<<<< HEAD
     * Configures aliases for Filter classes to
     * make reading things nicer and simpler.
     *
     * @var array<string, class-string|list<class-string>>
     *
     * [filter_name => classname]
     * or [filter_name => [classname1, classname2, ...]]
=======
     * Aliases untuk filter agar lebih mudah dipanggil.
     *
     * @var array<string, class-string|list<class-string>>
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
     */
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
<<<<<<< HEAD
        'cors'          => Cors::class,
=======
        'cors' => \App\Filters\Cors::class,
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
        'forcehttps'    => ForceHTTPS::class,
        'pagecache'     => PageCache::class,
        'performance'   => PerformanceMetrics::class,
    ];

    /**
<<<<<<< HEAD
     * List of special required filters.
     *
     * The filters listed here are special. They are applied before and after
     * other kinds of filters, and always applied even if a route does not exist.
     *
     * Filters set by default provide framework functionality. If removed,
     * those functions will no longer work.
     *
     * @see https://codeigniter.com/user_guide/incoming/filters.html#provided-filters
     *
     * @var array{before: list<string>, after: list<string>}
     */
    public array $required = [
        'before' => [
            'forcehttps', // Force Global Secure Requests
            'pagecache',  // Web Page Caching
        ],
        'after' => [
            'pagecache',   // Web Page Caching
            'performance', // Performance Metrics
            'toolbar',     // Debug Toolbar
        ],
    ];

    /**
     * List of filter aliases that are always
     * applied before and after every request.
     *
     * @var array<string, array<string, array<string, string>>>|array<string, list<string>>
     */
    public array $globals = [
        'before' => [
            // 'honeypot',
            // 'csrf',
            // 'invalidchars',
        ],
        'after' => [
            // 'honeypot',
            // 'secureheaders',
        ],
    ];

    /**
     * List of filter aliases that works on a
     * particular HTTP method (GET, POST, etc.).
     *
     * Example:
     * 'POST' => ['foo', 'bar']
     *
     * If you use this, you should disable auto-routing because auto-routing
     * permits any HTTP method to access a controller. Accessing the controller
     * with a method you don't expect could bypass the filter.
=======
     * Filter yang selalu dijalankan sebelum dan sesudah request.
     *
     * @var array<string, list<string>>
     */
   public array $globals = [
    'before' => ['cors'],
    'after' => ['toolbar'],
];

    /**
     * Filter berdasarkan method HTTP (GET, POST, dll).
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
     *
     * @var array<string, list<string>>
     */
    public array $methods = [];

    /**
<<<<<<< HEAD
     * List of filter aliases that should run on any
     * before or after URI patterns.
     *
     * Example:
     * 'isLoggedIn' => ['before' => ['account/*', 'profiles/*']]
=======
     * Filter berdasarkan URI pattern.
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
     *
     * @var array<string, array<string, list<string>>>
     */
    public array $filters = [];
<<<<<<< HEAD
=======

    /**
     * Filter yang wajib dijalankan bahkan jika route tidak ditemukan.
     *
     * @var array{before: list<string>, after: list<string>}
     */
    public array $required = [
        'before' => [
            'forcehttps',
            'pagecache',
        ],
        'after' => [
            'pagecache',
            'performance',
            'toolbar',
        ],
    ];
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
}
