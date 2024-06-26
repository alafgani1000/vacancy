<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VacancyStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'description' => 'required',
            'qualification' => 'required',
            'job_desc' => 'required',
            'work_type' => 'required',
            'job_level' => 'required',
            'city' => 'required',
            'country' => 'required',
            'end_date' => 'required',
            'category' => 'required'
        ];
    }
}
