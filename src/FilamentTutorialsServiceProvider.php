<?php

namespace Guava\FilamentTutorials;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Guava\FilamentTutorials\Livewire\Components\StepContainer;
use Guava\FilamentTutorials\View\Components\Tutorials;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentTutorialsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('filament-tutorials')
            ->hasViews()
            ->hasViewComponents('filament-tutorials',
                Tutorials::class,
                StepContainer::class,
            )
        ;
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            AlpineComponent::make('tutorial', __DIR__.'/../resources/js/dist/components/tutorial.js'),
        ], package: 'guava/filament-tutorials');
    }
}
