<?php

namespace Guava\Tutorials;

use Filament\Forms\Components\Component;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;
use Filament\Support\Components\ViewComponent;
use Guava\Tutorials\Contracts\HasTutorials;
use Illuminate\Database\Eloquent\Model;

class ComponentContainer extends ViewComponent
{
    use Concerns\BelongsToLivewire;

    //    use BelongsToModel;
    //    use Concerns\BelongsToParentComponent;
    //    use Concerns\CanBeDisabled;
    //    use Concerns\CanBeHidden;
    //    use Concerns\CanBeValidated;
    //    use Concerns\Cloneable;
    //    use Concerns\HasColumns;
    use Concerns\HasSteps;

    //    use Concerns\HasFieldWrapper;
    //    use Concerns\HasInlineLabels;
    //    use Concerns\HasOperation;
    //    use Concerns\HasState;
    //    use Concerns\HasStateBindingModifiers;
    //    use Concerns\ListensToEvents;
    //    use Concerns\SupportsComponentFileAttachments;
    //    use Concerns\SupportsFileUploadFields;
    //    use Concerns\SupportsSelectFields;
    use Concerns\CanBeTriggered;
    use Concerns\CanBeCompleted;

    protected string $view = 'tutorials::component-container';

    protected string $evaluationIdentifier = 'container';

    protected string $viewIdentifier = 'container';

    final public function __construct(HasTutorials $livewire)
    {
        $this->livewire($livewire);
    }

    public static function make(HasTutorials $livewire): static
    {
        return app(static::class, ['livewire' => $livewire]);
    }


    protected function getGetCallback(): callable
    {
        $component = new Component();
        /** @var HasForms $livewire */
        $livewire = $this->getLivewire();
        $form = $livewire->getForm('form');
        $component->container($form);

        return new Get($component);
    }

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'get' => [$this->getGetCallback()],
            //            'model' => [$this->getModel()],
            //            'record' => [$this->getRecord()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    //    /**
    //     * @return array<mixed>
    //     */
    //    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    //    {
    //        $record = $this->getRecord();
    //
    //        if (! $record) {
    //            return parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType);
    //        }
    //
    //        return match ($parameterType) {
    //            Model::class, $record::class => [$record],
    //            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
    //        };
    //    }
}
